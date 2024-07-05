export const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = now - postDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return 'Just now';
    } else if (seconds < 120) {
      return '1m ago';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24 && now.getDate() === postDate.getDate()) {
      return postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 24 && now.getDate() !== postDate.getDate()) {
      return postDate.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' });
    } else if (days < 7) {
      return postDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    } else {
      return postDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
  };