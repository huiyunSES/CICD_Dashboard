
const Issue = `
WITH avg_resolving_times AS (
    SELECT
        product_team.product_team,
        AVG(EXTRACT(EPOCH FROM (issue.closed_at - issue.created_at)) / 3600) AS avg_resolving_time_hours
FROM issue
LEFT JOIN repo_mapping ON issue.repo_id = repo_mapping.repo_id
LEFT JOIN product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE issue.closed_at IS NOT NULL
GROUP BY product_team.product_team
)

SELECT
    (SELECT COUNT(issue.*) as overdue_issue
    FROM issue
    LEFT JOIN repo_mapping ON issue.repo_id = repo_mapping.repo_id
    LEFT JOIN product_team ON repo_mapping.product_team_id = product_team.product_team_id
    WHERE closed_at > due_on
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN issue.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN issue.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN issue.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN issue.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN issue.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
)) AS overdue_issue,


(SELECT ROUND(AVG(EXTRACT(EPOCH FROM (issue.closed_at - issue.created_at)) / 3600))::integer AS avg_resolving_time_hours
FROM issue
LEFT JOIN repo_mapping ON issue.repo_id = repo_mapping.repo_id
LEFT JOIN product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE issue.closed_at IS NOT NULL
AND (product_team.product_team = $1 OR $1 IS NULL)
AND (
    CASE
    WHEN $2 = 'Last 7 days' THEN issue.created_at >= NOW() - INTERVAL '7 days'
    WHEN $2 = 'Last 30 days' THEN issue.created_at >= NOW() - INTERVAL '1 month'
    WHEN $2 = 'Last 3 months' THEN issue.created_at >= NOW() - INTERVAL '3 months'
    WHEN $2 = 'Last 6 months' THEN issue.created_at >= NOW() - INTERVAL '6 months'
    WHEN $2 = 'Last 1 year' THEN issue.created_at >= NOW() - INTERVAL '1 year'
    ELSE TRUE
END
)) AS average_resolving_time,


(SELECT product_team
    FROM avg_resolving_times
    WHERE avg_resolving_time_hours = (
        SELECT MIN(avg_resolving_time_hours)
        FROM avg_resolving_times
        WHERE (
             CASE
                WHEN $2 = 'Last 7 days' THEN NOW() - INTERVAL '7 days' <= CURRENT_DATE
                WHEN $2 = 'Last 30 days' THEN NOW() - INTERVAL '1 month' <= CURRENT_DATE
                WHEN $2 = 'Last 3 months' THEN NOW() - INTERVAL '3 months' <= CURRENT_DATE
                WHEN $2 = 'Last 6 months' THEN NOW() - INTERVAL '6 months' <= CURRENT_DATE
                WHEN $2 = 'Last 1 year' THEN NOW() - INTERVAL '1 year' <= CURRENT_DATE
                ELSE TRUE
            END
        )
)) AS fastest_team;
`
const Issue_bar_chart = `


SELECT
    COALESCE(product_team.product_team, 'Unknown') AS product_team,
    COUNT(*) AS total_issue,
    SUM(CASE WHEN issue.closed_at IS NOT NULL THEN 1 ELSE 0 END) AS closed_issue
FROM
    issue
LEFT JOIN
    repo_mapping ON issue.repo_id = repo_mapping.repo_id
LEFT JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    (product_team.product_team = $1 OR $1 IS NULL)
AND (
    CASE
        WHEN $2 = 'Last 7 days' THEN issue.created_at >= NOW() - INTERVAL '7 days'
        WHEN $2 = 'Last 30 days' THEN issue.created_at >= NOW() - INTERVAL '1 month'
        WHEN $2 = 'Last 3 months' THEN issue.created_at >= NOW() - INTERVAL '3 months'
        WHEN $2 = 'Last 6 months' THEN issue.created_at >= NOW() - INTERVAL '6 months'
        WHEN $2 = 'Last 1 year' THEN issue.created_at >= NOW() - INTERVAL '1 year'
        ELSE TRUE
    END
)
GROUP BY
    COALESCE(product_team.product_team, 'Unknown');
`
const Issue_line_chart = `


SELECT
    TO_CHAR(DATE_TRUNC('month', issue.created_at), 'MM/YYYY') AS month,
    ROUND(AVG(EXTRACT(EPOCH FROM (issue.closed_at - issue.created_at)) / 3600))::integer AS avg_resolving_time_hours
FROM
    issue
LEFT JOIN
    repo_mapping ON issue.repo_id = repo_mapping.repo_id
LEFT JOIN
    product_team ON repo_mapping.product_team_id = product_team.product_team_id
WHERE
    (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN issue.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN issue.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN issue.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN issue.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN issue.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
)
GROUP BY
    TO_CHAR(DATE_TRUNC('month', issue.created_at), 'MM/YYYY'),
    DATE_TRUNC('month', issue.created_at) 
ORDER BY
    DATE_TRUNC('month', issue.created_at); 


`
module.exports ={
Issue,
Issue_bar_chart,
Issue_line_chart,
};


