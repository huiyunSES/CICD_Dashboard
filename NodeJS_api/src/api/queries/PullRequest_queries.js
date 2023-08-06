const PullRequest =
`
SELECT
    COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (pull_request.merged_at - pull_request.created_at)) / 86400))::integer, 0) AS avg_merge_time_days,
    COALESCE(ROUND(COUNT(*) FILTER (WHERE merged_at IS NOT NULL) * 1.0 / NULLIF(COUNT(*) FILTER (WHERE closed_at IS NOT NULL), 0), 2) * 100::integer, 0) AS merge_closed_ratio
FROM
    pull_request
LEFT JOIN
    repository ON pull_request.repo_id = repository.repo_id
LEFT JOIN
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE
    merged_at IS NOT NULL
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN pull_request.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN pull_request.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN pull_request.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN pull_request.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN pull_request.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
    );


`

module.exports ={
PullRequest,
};
