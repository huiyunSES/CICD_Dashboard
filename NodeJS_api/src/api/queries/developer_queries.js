
const Developer = 
`
SELECT
    workflow_run.workflow_id,
    workflow_run.run_name,
    TO_CHAR(workflow_run.started_at, 'mm/dd/yyyy') AS started_at,
    TO_CHAR(workflow_run.updated_at, 'mm/dd/yyyy') AS updated_at,
    workflow_run.main_branch,
    workflow_run.conclusion AS run_conclusion,
    workflow_run.event,
    workflow_run.run_number,
    workflow_run.converage_rate,
    users.github_username,
    repository.repository_name,
    product_team.product_team,
    ARRAY_AGG(JSON_BUILD_OBJECT('step_name', workflow_step.step_name, 'conclusion', workflow_step.conclusion) ORDER BY workflow_step.step_id) AS workflow_steps
FROM 
    workflow_run
INNER JOIN 
    workflow_step ON workflow_run.workflow_id = workflow_step.workflow_id
INNER JOIN 
    users ON workflow_run.actor_id = users.user_id
INNER JOIN 
    repository ON workflow_run.repo_id = repository.repo_id
INNER JOIN
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE
    (repository.repository_name =$1 OR $1 IS NULL)
    AND (product_team.product_team =$2 OR $2 IS NULL)
    AND (users.github_username =$3 OR $3 IS NULL)
    AND (

        (CASE WHEN $4 = '0-50%' THEN workflow_run.converage_rate >= 0 AND workflow_run.converage_rate < 0.5 END OR
         CASE WHEN $4 = '50-75%' THEN workflow_run.converage_rate >= 0.5 AND workflow_run.converage_rate < 0.75 END OR
         CASE WHEN $4 = '75-90%' THEN workflow_run.converage_rate >= 0.75 AND workflow_run.converage_rate < 0.9 END OR
         CASE WHEN $4 = '90-100%' THEN workflow_run.converage_rate >= 0.9 AND workflow_run.converage_rate <= 1.0 END OR
         $4 IS NULL) 
    )
    AND (CASE
           WHEN $5 = 'Last 7 days' THEN workflow_run.updated_at >= NOW() - INTERVAL '7 days'
           WHEN $5 = 'Last 30 days' THEN workflow_run.updated_at >= NOW() - INTERVAL '1 month'
           WHEN $5 = 'Last 3 months' THEN workflow_run.updated_at >= NOW() - INTERVAL '3 months'
           WHEN $5 = 'Last 6 months' THEN workflow_run.updated_at >= NOW() - INTERVAL '6 months'
           WHEN $5 = 'Last 1 year' THEN workflow_run.updated_at >= NOW() - INTERVAL '1 year'
           ELSE TRUE
         END)
GROUP BY
    workflow_run.workflow_id,
    workflow_run.run_name,
    workflow_run.started_at,
    workflow_run.updated_at,
    workflow_run.main_branch,
    workflow_run.conclusion,
    workflow_run.event,
    workflow_run.run_number,
    workflow_run.converage_rate,
    users.github_username,
    repository.repository_name,
    product_team.product_team;

    `

module.exports ={
 
  Developer,

 };
