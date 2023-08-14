const product_list =
`
SELECT product_team_id, product_team FROM product_team;
`

const repo_list =
`
SELECT repo_id, repository_name FROM repository;
`
const product_repo =
`
SELECT product_team.product_team_id,product_team.product_team,(
	SELECT array_to_json(array_agg(row_to_json(r))) FROM (
		SELECT repository.repo_id,repository.repository_name
		FROM repo_mapping LEFT JOIN
			repository ON repo_mapping.repo_id = repository.repo_id
		WHERE repo_mapping.product_team_id = product_team.product_team_id
	) r
) as repository_list FROM product_team
`

const add_mapping =
`
INSERT INTO repo_mapping (product_team_id, repo_id)
VALUES
($1, $2)
`

const add_mapping_func = (length)=>{
    let query = `INSERT INTO repo_mapping (product_team_id, repo_id)
    VALUES`
    for(let i = 1;i<=length;i++) {
        const num = i+1
        query += ` ($1, $` + num +')'
        if(i<length) {
            query+=','
        }
    }
    return query
}

const delete_mapping =
`
DELETE FROM repo_mapping
WHERE product_team_id = $1
`



module.exports ={
product_list,
repo_list,
add_mapping,
delete_mapping,
product_repo,
add_mapping_func,
};

