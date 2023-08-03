const pool = require('../../db');
const issue_queries = require('./queries/issue_queries');
const repositories_queries = require('./queries/repositories_queries');
const PullRequest_queries = require('./queries/PullRequest_queries');
const ProjectLead_queries = require('./queries/ProjectLead_queries');
const developer_queries = require('./queries/developer_queries');
const user_queries = require('./queries/user_queries');
const coverage_queries = require('./queries/coverage_queries');
const deployment_queries = require('./queries/deployment_queries');



const Deployment = async (req, res) => {
   const {product_team} = req.query;
   const Deployment = await pool.query(deployment_queries.Deployment, [product_team]);
   const DeploymentFrequency = await pool.query(deployment_queries.DeploymentFrequency, [product_team]);
   const response = {  
      "Deployment": Deployment.rows[0],
      "DeploymentFrequency": DeploymentFrequency.rows
      
   }
   return res.status(200).json(response);
 };

 const Users = (req, res) => {
    pool.query(user_queries.Users, (error, results) => {
     if (error) throw error;
     res.status(200).json(results.rows);
    });
 };

 const addUser = (req, res) => {

   const { user_id, first_name, last_name, username, github_username, email, password, product_team, role_name} = req.body;

       pool.query(user_queries.addUser, [user_id, first_name, last_name, username, github_username, email, password, product_team, role_name], (error, results) => {
           if (error) throw error;
           res.status(201).send("User profile added!")
           console.log("User profile added!")
       })      
};

const PullRequest = (req, res) => {
   const {product_team} = req.query;
    pool.query(PullRequest_queries.PullRequest, [product_team], (error, results) => {
     if (error) throw error;
     res.status(200).json(results.rows[0]);
    });
 };
 

 const Issue = async (req, res) => {
   const {product_team} = req.query;
   const Issue = await pool.query(issue_queries.Issue, [product_team]);
   const Issue_chart = await pool.query(issue_queries.Issue_chart, [product_team]);
 
   const response = {
     "Issue": Issue.rows[0],
     "Issue_chart": Issue_chart.rows
   };
 
   return res.status(200).json(response);
 };

 const Developer = (req, res) => {
   const { repository_name, product_team, github_username, converage_rate_range, last_time } = req.query;
   pool.query(developer_queries.Developer, [repository_name, product_team, github_username, converage_rate_range, last_time], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
   });
};


const Repository = (req, res) => {
   const {product_team} = req.query;
    pool.query(repositories_queries.Repository, [product_team], (error, results) => {
     if (error) throw error;
     res.status(200).json(results.rows[0]);
    });
 };
 

const ProjectLead = (req, res) => {
   const { repository_name, product_team, run_conclusion } = req.query;
   pool.query(ProjectLead_queries.ProjectLead, [repository_name, product_team, run_conclusion], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
   });
};

const Coverage = async (req, res) => {
   const {product_team} = req.query;
   const coverage_rate_distribution = await pool.query(coverage_queries.coverage_rate_distribution, [product_team]);
   const team_with_most_HighCoverage = await pool.query(coverage_queries.team_with_most_HighCoverage);
 
   const response = {
     "coverage_rate_distribution": coverage_rate_distribution.rows,
     "team_with_most_HighCoverage": team_with_most_HighCoverage.rows[0]
   };
 
   return res.status(200).json(response);
 };

module.exports ={
    Deployment,
    Users,
    addUser,
    PullRequest,
    Issue,
    Developer,
    Repository,
    ProjectLead,
    Coverage,

};