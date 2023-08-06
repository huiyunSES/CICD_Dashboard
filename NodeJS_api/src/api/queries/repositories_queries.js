const Repository = `

SELECT
    (SELECT COALESCE(ROUND(COUNT(*) / 30.0 * 100)::INT, 0)
    FROM repository
    LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE repository.is_disabled = 'FALSE'
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN repository.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN repository.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN repository.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN repository.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN repository.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
         END
    )) AS GitHub_Usage,


    (SELECT COALESCE(COUNT(*), 0)
    FROM repository
    LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE repository.is_disabled = 'FALSE'
        AND repository.updated_at <= NOW() - INTERVAL '3 months'
        AND (product_team.product_team = $1 OR $1 IS NULL)
        AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN repository.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN repository.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN repository.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN repository.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN repository.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
    )) AS idle_repositories,


    (SELECT COALESCE(ROUND(COUNT(CASE WHEN repository.is_disabled = 'TRUE' THEN 1 END)::DECIMAL / NULLIF(COUNT(*), 0) * 100)::INT, 0)
        FROM repository
    LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE repository.is_disabled = 'FALSE'
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN repository.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN repository.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN repository.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN repository.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN repository.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
    )) AS inactive_repositories_percentage,


    (SELECT COALESCE(ROUND(COUNT(CASE WHEN repository.is_disabled = 'FALSE' THEN 1 END)::DECIMAL / NULLIF(COUNT(*), 0) * 100)::INT, 0)
    FROM repository
    LEFT JOIN product_team ON repository.product_team_id = product_team.product_team_id
    WHERE repository.is_disabled = 'FALSE'
    AND (product_team.product_team = $1 OR $1 IS NULL)
    AND (
        CASE
            WHEN $2 = 'Last 7 days' THEN repository.created_at >= NOW() - INTERVAL '7 days'
            WHEN $2 = 'Last 30 days' THEN repository.created_at >= NOW() - INTERVAL '1 month'
            WHEN $2 = 'Last 3 months' THEN repository.created_at >= NOW() - INTERVAL '3 months'
            WHEN $2 = 'Last 6 months' THEN repository.created_at >= NOW() - INTERVAL '6 months'
            WHEN $2 = 'Last 1 year' THEN repository.created_at >= NOW() - INTERVAL '1 year'
            ELSE TRUE
        END
    )) AS active_repositories_percentage;
`;

module.exports = {
Repository,
};
