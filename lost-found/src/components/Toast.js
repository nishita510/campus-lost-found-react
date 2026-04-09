import React from 'react';

// Toast is a CLASS component — demonstrates class components with constructor
class Toast extends React.Component {
  constructor(props) {
    super(props);
    // Local state to control visibility
    this.state = {
      visible: true,
    };
  }

  // When component mounts, auto-hide after 3 seconds
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ visible: false });
      if (this.props.onClose) {
        this.props.onClose();
      }
    }, 3000);
  }

  // Clean up timer when component unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (!this.state.visible) return null;

    return (
      <div className="toast">
        <span className="toast-icon">✅</span>
        <span className="toast-msg">{this.props.message}</span>
      </div>
    );
  }
}

export default Toast;
