const ProjectLead =`
SELECT
    product_team.product_team,
    repository.repository_name,
    JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'workflow_id', workflow_run.workflow_id,
            'run_name', workflow_run.run_name,
            'started_at', TO_CHAR(workflow_run.started_at, 'mm/dd/yyyy'), -- Corrected placement
            'updated_at', TO_CHAR(workflow_run.updated_at, 'mm/dd/yyyy'), -- Corrected placement
            'main_branch', workflow_run.main_branch,
            'run_conclusion', workflow_run.conclusion,
            'event', workflow_run.event,
            'run_number', workflow_run.run_number,
            'converage_rate', workflow_run.converage_rate,
            'github_username', users.github_username
        )
    ) AS workflow_runs
FROM 
    workflow_run
INNER JOIN 
    repository ON workflow_run.repo_id = repository.repo_id
INNER JOIN 
    users ON workflow_run.actor_id = users.user_id
INNER JOIN 
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE
    (repository.repository_name = $1 OR $1 IS NULL)
    AND (product_team.product_team = $2 OR $2 IS NULL)
    AND (workflow_run.conclusion = $3 OR $3 IS NULL)
GROUP BY
    product_team.product_team,
    repository.repository_name;
`

module.exports ={
    ProjectLead,
};