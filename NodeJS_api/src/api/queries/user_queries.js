const Users = `
SELECT 
    users.*,
    role.role_name,
    product_team.product_team
FROM 
    users
LEFT JOIN 
    role ON users.role_id = role.role_id
LEFT JOIN 
    product_team ON users.product_team_id = product_team.product_team_id;
`
const addUser = `
INSERT INTO users (user_id, first_name, last_name, username, github_username, email, password, product_team_id, role_id)
VALUES ($1, $2, $3, $4, $5, $6, $7,
        (SELECT product_team_id FROM product_team WHERE product_team = $8),
        (SELECT role_id FROM role WHERE role_name = $9));
`;

module.exports ={
    Users,
    addUser,

};