const coverage_rate_distribution =
`
SELECT
    COALESCE(product_team.product_team, 'Unknown') AS product_team,
    COUNT(CASE WHEN workflow_run.converage_rate < 0.5 THEN 1 END) AS "0-50%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.5 AND workflow_run.converage_rate < 0.75 THEN 1 END) AS "50-75%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.75 AND workflow_run.converage_rate < 0.9 THEN 1 END) AS "75-90%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.9 THEN 1 END) AS "90-100%"
FROM
    workflow_run
LEFT JOIN
    repo_mapping ON workflow_run.repo_id = repo_mapping.repo_id
LEFT JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN workflow_run.started_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN workflow_run.started_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN workflow_run.started_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN workflow_run.started_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN workflow_run.started_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
    )
GROUP BY
    COALESCE(product_team.product_team, 'Unknown');

`

const team_with_most_HighCoverage =
`
SELECT
    product_team.product_team
FROM
    workflow_run
INNER JOIN
    repo_mapping ON workflow_run.repo_id = repo_mapping.repo_id
INNER JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    CASE
        WHEN $1 = 'Last 7 days' THEN workflow_run.started_at >= NOW() - INTERVAL '7 days'
        WHEN $1 = 'Last 30 days' THEN workflow_run.started_at >= NOW() - INTERVAL '1 month'
        WHEN $1 = 'Last 3 months' THEN workflow_run.started_at >= NOW() - INTERVAL '3 months'
        WHEN $1 = 'Last 6 months' THEN workflow_run.started_at >= NOW() - INTERVAL '6 months'
        WHEN $1 = 'Last 1 year' THEN workflow_run.started_at >= NOW() - INTERVAL '1 year'
        ELSE TRUE
    END
GROUP BY
    product_team.product_team
ORDER BY
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.9 THEN 1 END) DESC
LIMIT 1;
`


module.exports ={
coverage_rate_distribution,
team_with_most_HighCoverage,
};
