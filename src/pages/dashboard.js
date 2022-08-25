import React from "react";
import Page from "../components/Page";
import AdminLayout from "../layouts/AdminLayout";
import ProductDashboard from "../sections/admin/dashboard/ProductDashboard";
import AddProductDialog from "../sections/admin/dashboard/dialogs/AddProductDialog";
import DeleteProductDialog from "../sections/admin/dashboard/dialogs/DeleteProductDialog";
import EditProductDialog from "../sections/admin/dashboard/dialogs/EditProductDialog";
import withAuthClient from "../utils/client/withAuthClient";

function Dashboard() {
  return (
    <AdminLayout>
      <Page title="Dashboard">
        <ProductDashboard />
        <AddProductDialog />
        <EditProductDialog />
        <DeleteProductDialog />
      </Page>
    </AdminLayout>
  );
}

export default withAuthClient(Dashboard, "admin");
