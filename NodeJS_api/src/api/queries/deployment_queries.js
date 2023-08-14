const Deployment = `
SELECT
    COUNT(*) AS total_deployment,
    COALESCE(ROUND((COUNT(CASE WHEN deployment.completed_at IS NOT NULL AND deployment.status = 'success' THEN 1 END) / NULLIF(COUNT(*)::float, 0)) * 100)::int, 0) AS success_rate_percentage,
    COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (deployment.completed_at - deployment.created_at)) / 3600)), 0) AS avg_deployment_time
FROM
    deployment
LEFT JOIN
    repo_mapping ON deployment.repo_id = repo_mapping.repo_id
LEFT JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN deployment.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN deployment.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN deployment.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN deployment.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN deployment.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
            END
    );


`
const DeploymentFrequency = `
SELECT
    TO_CHAR(DATE_TRUNC('month', deployment.completed_at), 'Mon YYYY') AS deployment_month,
    COUNT(*) AS deployment_frequency
FROM
    deployment
LEFT JOIN
    repo_mapping ON deployment.repo_id = repo_mapping.repo_id
LEFT JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    deployment.completed_at IS NOT NULL
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
        WHEN $2 = 'Last 7 days' THEN deployment.created_at >= NOW() - INTERVAL '7 days'
        WHEN $2 = 'Last 30 days' THEN deployment.created_at >= NOW() - INTERVAL '1 month'
        WHEN $2 = 'Last 3 months' THEN deployment.created_at >= NOW() - INTERVAL '3 months'
        WHEN $2 = 'Last 6 months' THEN deployment.created_at >= NOW() - INTERVAL '6 months'
        WHEN $2 = 'Last 1 year' THEN deployment.created_at >= NOW() - INTERVAL '1 year'
        ELSE TRUE
        END
        )
GROUP BY
    DATE_TRUNC('month', deployment.completed_at),
    product_team.product_team
ORDER BY
    DATE_TRUNC('month', deployment.completed_at);

`



module.exports ={
Deployment,
DeploymentFrequency,
};


