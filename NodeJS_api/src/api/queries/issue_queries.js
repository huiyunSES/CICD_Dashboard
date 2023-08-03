
const Issue = `
WITH avg_resolving_times AS (
    SELECT
      product_team.product_team,
      AVG(EXTRACT(EPOCH FROM (issue.closed_at - issue.created_at)) / 3600) AS avg_resolving_time_hours
    FROM issue
    INNER JOIN repository ON issue.repo_id = repository.repo_id
    INNER JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE issue.closed_at IS NOT NULL
    GROUP BY product_team.product_team
  )
  SELECT
    (SELECT COUNT(issue.*) as overdue_issue
    FROM issue
    INNER JOIN repository ON issue.repo_id = repository.repo_id
    INNER JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE closed_at > due_on
    AND (product_team.product_team = $1 OR $1 IS NULL)) AS overdue_issue,
  
    (SELECT ROUND(AVG(EXTRACT(EPOCH FROM (issue.closed_at - issue.created_at)) / 3600))::integer AS avg_resolving_time_hours
    FROM issue
    INNER JOIN repository ON issue.repo_id = repository.repo_id
    INNER JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE issue.closed_at IS NOT NULL
    AND (product_team.product_team = $1 OR $1 IS NULL)) AS average_resolving_time,
  
    (SELECT product_team
    FROM avg_resolving_times
    WHERE avg_resolving_time_hours = (SELECT MIN(avg_resolving_time_hours) FROM avg_resolving_times)) AS fastest_team;
  
    `
const Issue_chart = `

SELECT
    product_team.product_team AS product_team,
    COUNT(*) AS total_issue,
    SUM(CASE WHEN issue.closed_at IS NOT NULL THEN 1 ELSE 0 END) AS closed_issue
FROM
    issue
INNER JOIN
    repository ON issue.repo_id = repository.repo_id
INNER JOIN
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE 
    (product_team.product_team = $1 OR $1 IS NULL)
GROUP BY
    product_team.product_team;
    `

module.exports ={
    Issue,
    Issue_chart,
};