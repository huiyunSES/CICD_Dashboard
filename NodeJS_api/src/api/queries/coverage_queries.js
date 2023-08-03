const coverage_rate_distribution = 
`

SELECT
    product_team.product_team,
    COUNT(CASE WHEN workflow_run.converage_rate < 0.5 THEN 1 END) AS "0-50%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.5 AND workflow_run.converage_rate < 0.75 THEN 1 END) AS "50-75%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.75 AND workflow_run.converage_rate < 0.9 THEN 1 END) AS "75-90%",
    COUNT(CASE WHEN workflow_run.converage_rate >= 0.9 THEN 1 END) AS "90-100%"
FROM 
    workflow_run
INNER JOIN 
    repository ON workflow_run.repo_id = repository.repo_id
INNER JOIN 
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE
    (product_team.product_team = $1 OR $1 IS NULL)
GROUP BY
    product_team.product_team;

    `
const team_with_most_HighCoverage = 
    `
    SELECT
    product_team.product_team
FROM 
    workflow_run
INNER JOIN 
    repository ON workflow_run.repo_id = repository.repo_id
INNER JOIN 
    product_team ON repository.product_team_id = product_team.product_team_id
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