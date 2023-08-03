# CI/CD Dashboard

## Overview

The CI/CD dashboard integrates all CI/CD activities and provides functions for filtering data by time, product name, repository name, or GitHub users. The dashboard is designed to 3 personas: Executive Summary, Developer View, and Project Lead View.

The **Executive Summary** view presents an overview of the product team's performance through numbers, graphs, and charts.

The **Developer** View offers a comprehensive overview in the GitHub Actions that includes repository name, owner, coverage rate, workflow step and workflow run status, main branch and event type.

The **Project Lead** View provides a high-level snapshot of the project, including the product name, repository, main branch, workflow run status, event type and coverage rate.

![alt text](./workflow.png)

Design Doc: [CI/CD Design Doc](https://equinixjira.atlassian.net/wiki/spaces/~7120201faa0f7e5d6f4ac485128a490f67e998/pages/145726999124/CI+CD+Dashboard+Design+Document)

## Folder Description

**1. cicd_db (Python)**:
1) mocked data for dashboard
2) Postgresql database: tables setup and data loading

**Database schema**:
![alt text](./db_schema.png)

**2. NodeJs_api(node.js)**:
API is currently run locally - available apis:

**GET**
1) localhost:3000/api/v1/issue
2) localhost:3000/api/v1/deployment
3) localhost:3000/api/v1/repository
4) localhost:3000/api/v1/pull-request
5) localhost:3000/api/v1/developer
6) localhost:3000/api/v1/project-lead
7) localhost:3000/api/v1/user

**POST**
1) localhost:3000/api/v1/user

API doc:
[CI/CD Dashboard API doc](https://equinixjira.atlassian.net/wiki/spaces/~7120201faa0f7e5d6f4ac485128a490f67e998/pages/145757963676/CI+CD+Dashboard+API+doc)

**3. frontend(react.js)**:
1) UI dashboard for 3 personas.
2) Technology used: React, react-router, material-ui, recharts, echarts

To run:
1) install dependency: npm i
2) npm start
