const Repository =
`
SELECT
    (SELECT ROUND(COUNT(*) / 30.0 * 100)::INT
     FROM repository
     LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
     WHERE repository.is_disabled = 'False'
     AND (product_team.product_team = $1 OR $1 IS NULL)
    ) AS GitHub_Usage,

    (SELECT COUNT(*)
     FROM repository
     LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
     WHERE repository.is_disabled = 'False'
       AND repository.updated_at <= NOW() - INTERVAL '3 months'
       AND (product_team.product_team = $1 OR $1 IS NULL)
    ) AS idle_repositories,

    (SELECT COALESCE(ROUND(COUNT(CASE WHEN repository.is_disabled = 'True' THEN 1 END)::DECIMAL / NULLIF(COUNT(*), 0) * 100)::INT, 0)
     FROM repository
     LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
     WHERE (product_team.product_team = $1 OR $1 IS NULL)
    ) AS inactive_repositories_percentage,

    (SELECT COALESCE(ROUND(COUNT(CASE WHEN repository.is_disabled = 'False' THEN 1 END)::DECIMAL / NULLIF(COUNT(*), 0) * 100)::INT, 0)
     FROM repository
     LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
     WHERE (product_team.product_team = $1 OR $1 IS NULL)
    ) AS active_repositories_percentage;


    `

module.exports ={
        Repository,
    };