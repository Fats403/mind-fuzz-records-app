import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import DashboardTableHead from "../../../components/dashboard/DashboardTableHead";
import DashboardTableToolbar from "../../../components/dashboard/DashboardTableToolbar";
import headCells from "./headCells";
import { getComparator, stableSort } from "../../../utils/sort";
import useListProducts from "../../../hooks/products/useListProducts";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { DialogContext } from "../../../contexts/DialogProvider";

export default function ProductDashboard() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = React.useState("");
  const [allProducts, setAllProducts] = React.useState([]);

  const { products, isLoading } = useListProducts();
  const { openDialog } = React.useContext(DialogContext);

  const deleteProduct = (e, product) => {
    e.stopPropagation();
    openDialog({ open: true, data: product, name: "delete-product" });
  };

  const editProduct = (e, product) => {
    e.stopPropagation();
    openDialog({ open: true, data: product, name: "edit-product" });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allProducts.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allProducts.length) : 0;

  React.useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0) {
        return products;
      }
      const nonCaseSensitiveSearchText = searchText.toLowerCase();
      return products.filter((c) =>
        c?.title?.toLowerCase().includes(nonCaseSensitiveSearchText)
      );
    }

    const filteredRows = getFilteredArray();
    setAllProducts(filteredRows);
  }, [products, searchText]);

  return (
    <Box sx={{ width: "100%", pt: { xs: 4, md: 8 } }}>
      <Paper sx={{ width: "100%" }} variant="outlined">
        <DashboardTableToolbar
          numSelected={selected.length}
          title={"Product Dashboard"}
          searchText={searchText}
          onSearchChange={onSearchChange}
          openAddProductDialog={() => addProductDialog.setOpen(true)}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <DashboardTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allProducts.length}
              headCells={headCells}
            />
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {stableSort(allProducts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Box
                            sx={{
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {row.image && (
                              <Image src={row.image} width={40} height={40} />
                            )}
                            {row.title && (
                              <Typography sx={{ marginLeft: 2 }}>
                                {row.title}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {row.price && `$${row.price}`}
                        </TableCell>
                        <TableCell align="right">
                          {row.createdAt &&
                            new Date(row.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton onClick={(e) => editProduct(e, row)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={(e) => deleteProduct(e, row)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
