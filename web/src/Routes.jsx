// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>























      <Route path="/login" page={LoginPage} name="login" />

      <Route path="/signup" page={SignupPage} name="signup" />
      <PrivateSet unauthenticated='login'>
        <Set wrap={DashboardLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/orders" page={OrdersOrdersPage} name="orders" />
          <Route path="/neworder/{id:Int}" page={OrdersNeworderPage} name="neworder" />




          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Tables" titleTo="tables" buttonLabel="New Table" buttonTo="newTable">
            <Route path="/tables/new" page={TableNewTablePage} name="newTable" />
            <Route path="/tables/{id:Int}/edit" page={TableEditTablePage} name="editTable" />
            <Route path="/tables/{id:Int}" page={TableTablePage} name="table" />
            <Route path="/tables" page={TableTablesPage} name="tables" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Floors" titleTo="floors" buttonLabel="New Floor" buttonTo="newFloor">
            <Route path="/floors/new" page={FloorNewFloorPage} name="newFloor" />
            <Route path="/floors/{id:Int}/edit" page={FloorEditFloorPage} name="editFloor" />
            <Route path="/floors/{id:Int}" page={FloorFloorPage} name="floor" />
            <Route path="/floors" page={FloorFloorsPage} name="floors" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Purchases" titleTo="purchases" buttonLabel="New Purchase" buttonTo="newPurchase">
            <Route path="/purchases/new" page={PurchaseNewPurchasePage} name="newPurchase" />
            <Route path="/purchases/{id:Int}/edit" page={PurchaseEditPurchasePage} name="editPurchase" />
            <Route path="/purchases/{id:Int}" page={PurchasePurchasePage} name="purchase" />
            <Route path="/purchases" page={PurchasePurchasesPage} name="purchases" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Parties" titleTo="parties" buttonLabel="New Party" buttonTo="newParty">
            <Route path="/parties/new" page={PartyNewPartyPage} name="newParty" />
            <Route path="/parties/{id:Int}/edit" page={PartyEditPartyPage} name="editParty" />
            <Route path="/parties/{id:Int}" page={PartyPartyPage} name="party" />
            <Route path="/parties" page={PartyPartiesPage} name="parties" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Bottles" titleTo="bottles" buttonLabel="New Bottle" buttonTo="newBottle">
            <Route path="/bottles/new" page={BottleNewBottlePage} name="newBottle" />
            <Route path="/bottles/{id:Int}/edit" page={BottleEditBottlePage} name="editBottle" />
            <Route path="/bottles/{id:Int}" page={BottleBottlePage} name="bottle" />
            <Route path="/bottles" page={BottleBottlesPage} name="bottles" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Products" titleTo="products" buttonLabel="New Product" buttonTo="newProduct">
            <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
            <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
            <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
            <Route path="/products" page={ProductProductsPage} name="products" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Menus" titleTo="menus" buttonLabel="New Menu" buttonTo="newMenu">
            <Route path="/menus/new" page={MenuNewMenuPage} name="newMenu" />
            <Route path="/menus/{id:Int}/edit" page={MenuEditMenuPage} name="editMenu" />
            <Route path="/menus/{id:Int}" page={MenuMenuPage} name="menu" />
            <Route path="/menus" page={MenuMenusPage} name="menus" />
          </Set>






          <Set wrap={ScaffoldLayout} title="Sales" titleTo="sales" buttonLabel="New Sale" buttonTo="newSale">
            <Route path="/sales/new" page={SaleNewSalePage} name="newSale" />
            <Route path="/sales/{id:Int}/edit" page={SaleEditSalePage} name="editSale" />
            <Route path="/sales/{id:Int}" page={SaleSalePage} name="sale" />
            <Route path="/sales" page={SaleSalesPage} name="sales" />
          </Set>


        </Set>
      </PrivateSet>
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
