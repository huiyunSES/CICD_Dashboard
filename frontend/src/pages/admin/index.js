import React, { useState,useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Autocomplete,
  Pagination,
} from '@mui/material';
import { Delete, Edit, Save, Cancel, Add } from '@mui/icons-material';
import { queryAdmin, queryRepoList, saveAdmin } from "../../services/api";



const AdminTable = () => {
  const [data, setData] = useState([]);
  const [repoList, setRepoList] = useState([]) 
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [searchRepo, setSearchRepo] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [query, setQuery] = useState({
      product_team: '',
      run_conclusion: 'All',
      repository_name: '',
  })

  const handleQueryChange = (key, value) => {
      setQuery({
          ...query,
          [key]: value
      })
  }
  const getAdminData = async () => {
      const res = await queryAdmin(query)
      if(res && res.initial_data) {
        setData(res.initial_data || [])
      }
  }

  const getRepoData = async ()=>{
    const res = await queryRepoList()
    if(res && res.repository_list) {
    setRepoList(res.repository_list || [])
  }
  }

  const handleSave = async ()=>{
    const res = await saveAdmin({product_team_id:editingRow.product_team_id, repository_id_list: editingRow.repository_list &&  editingRow.repository_list.map(item=>item.repo_id)})
    getAdminData()
  }

  useEffect(() => {
    getAdminData()
    getRepoData()
  }, [query])


  const handleEditClick = (row) => {
    setIsEditMode(true);
    row.repository_list = row.repository_list || []
    setEditingRow({ ...row });
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setEditingRow(null);
  };

  const handleSaveClick = () => {
    handleSave();
    setIsEditMode(false);
    setEditingRow(null);
  };

  const renderActions = (row) => {
    if (isEditMode && editingRow && editingRow.id === row.id) {
      return (
        <>
          <IconButton onClick={handleSaveClick}>
            <Save />
          </IconButton>
          <IconButton onClick={handleCancelClick}>
            <Cancel />
          </IconButton>
        </>
      );
    } else {
      return (
        <>
          <IconButton onClick={() => handleEditClick(row)}>
            <Edit />
          </IconButton>
        </>
      );
    }
  };

  const filteredData = data.filter((row) => {
    if (!searchRepo) {
      return true; 
    }

    if (row.repository_list && Array.isArray(row.repository_list)) {
      const repositoryNames = row.repository_list.map(item => item.repository_name);
      return repositoryNames.some(name => name.includes(searchRepo));
    } 
    return false; 
  });
  
  

  const startIdx = page * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  return (
    <div>
      <h2 style={{ marginLeft: '15px' }}>Portfolio Management</h2>
      <div style={{ marginBottom: '20px', marginLeft: '15px' }}>
      <TextField
          label="Search by Repository"
          value={searchRepo}
          onChange={(e) => setSearchRepo(e.target.value)}
          style={{ marginLeft: '25px'}}
        />
      </div>
      <TableContainer component={Paper} style={{ width: '1500px', marginTop:'40px', margin: 'auto'}}>
        <Table style={{ minWidth: '600px' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '14px', width: '50px' }}>No.</TableCell>
              <TableCell style={{ fontSize: '14px', width: '180px' }}>Product</TableCell>
              <TableCell style={{ fontSize: '14px' , width:'700px'}}>Repository</TableCell>
              <TableCell style={{ fontSize: '14px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row,index) => (
              <TableRow key={row.product_team_id}>
                <TableCell>{startIdx + index + 1}</TableCell>
                <TableCell style={{ width: '150px' }}>
                    <div style={{ minWidth: '120px' }}>{row.product_team}</div>
                </TableCell>
                <TableCell>
                  {isEditMode && editingRow && editingRow.product_team_id === row.product_team_id ? (
                    <Autocomplete
                      multiple
                      value={editingRow.repository_list}
                      onChange={(e, newValue) => {
                        setEditingRow({ ...editingRow, repository_list: newValue })
                      }}
                      options={repoList}
                      getOptionLabel={(option) => option.repository_name}
                      renderInput={(params) => <TextField {...params} variant="standard" />}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {row.repository_list &&
                        row.repository_list.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              background: '#E5E4E2',
                              padding: '2px 6px',
                              margin: '2px',
                              borderRadius: '4px',
                              display: 'inline-block',
                            }}
                          >
                            {item.repository_name}
                          </div>
                        ))}
                    </div>
                  )}
                </TableCell>

                <TableCell>{renderActions(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredData.length / rowsPerPage)}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
        variant="outlined"
        shape="rounded"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default AdminTable;








