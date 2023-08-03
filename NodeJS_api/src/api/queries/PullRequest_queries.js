
const PullRequest = 
`
SELECT
    COUNT(pull_request.*) AS total_pull_request,
    ROUND(AVG(COALESCE(EXTRACT(EPOCH FROM (pull_request.merged_at - pull_request.created_at)), EXTRACT(EPOCH FROM (pull_request.closed_at - pull_request.created_at)))
    ) / 86400)::integer AS avg_pull_request_lead_time_days,
    COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (pull_request.merged_at - pull_request.created_at)) / 86400))::integer, 0)
    AS avg_merge_time_days,
    (ROUND(COUNT(*) FILTER (WHERE closed_at IS NOT NULL AND merged_at IS NOT NULL) * 1.0 / NULLIF(COUNT(*) FILTER (WHERE closed_at IS NOT NULL), 0), 2) * 100)::integer
    AS merge_closed_ratio
FROM
    pull_request
LEFT JOIN
    repository ON pull_request.repo_id = repository.repo_id
LEFT JOIN
    product_team ON repository.product_team_id = product_team.product_team_id
WHERE
	product_team.product_team = $1 OR $1 IS NULL;

`




module.exports ={

    PullRequest,
    
   
};