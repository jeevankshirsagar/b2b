import React, { Component } from "react";
import OrdersForm from "./OrdersForm";
import actions from "redux/actions/orders/ordersFormActions";
import { connect } from "react-redux";
import {withRouter} from 'next/router';
import Head from 'next/head';

class Index extends Component {
  state = {
    dispatched: false,
  };

  componentDidMount() {
    const { dispatch, router } = this.props;
    if (this.isEditing()) {
      dispatch(actions.doFind(router.query.id));
    } else {
      if (this.isProfile()) {
        const currentUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user"));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew());
      }
    }
    this.setState({ dispatched: true });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing() || this.isProfile()) {
      dispatch(actions.doUpdate(id, data, this.isProfile()));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  isEditing = () => {
    const { router } = this.props;
    return !!router.query.id;
  };

  isProfile = () => {
    const { router } = this.props;
    return router.pathname === "/app/profile";
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Edit Order</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <meta name="description" content="yodigital B2B" />
          <meta name="keywords" content="ecommerce, yodigital" />
          <meta name="author" content="yodigital pvt ltd" />
          <meta charSet="utf-8" />


          <meta property="og:title" content="YoDigital B2B ecommerce portal"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://localhost:3000"/>
          <meta property="og:image" content="https://localhost:3000/images/blogs/content_image_six.jpg"/>
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="fb:app_id" content="712557339116053" />

          <meta property="og:site_name" content="yodigital"/>
          <meta name="twitter:site" content="@yodigital" />
        </Head>
        {this.state.dispatched && (
          <OrdersForm
            saveLoading={this.props.saveLoading}
            findLoading={this.props.findLoading}
            currentUser={this.props.currentUser}
            record={
              this.isEditing() || this.isProfile() ? this.props.record : {}
            }
            isEditing={this.isEditing()}
            isProfile={this.isProfile()}
            onSubmit={this.doSubmit}
            onCancel={() => this.props.router.push("/admin/orders")}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    findLoading: store.orders.form.findLoading,
    saveLoading: store.orders.form.saveLoading,
    record: store.orders.form.record,
    currentUser: store.auth.currentUser,
  };
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default withRouter(connect(mapStateToProps)(Index))
