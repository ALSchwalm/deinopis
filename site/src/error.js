import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { connect } from "react-redux";
import { toggleError } from "./actions";

class ErrorDialog extends React.Component {
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.errorOpen}
          onClose={this.props.closeError}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.errorText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeError} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ErrorDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    errorOpen: state.errorOpen,
    errorText: state.errorText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeError: () => {
      dispatch(toggleError());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(ErrorDialog));
