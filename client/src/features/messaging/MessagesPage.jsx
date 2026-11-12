import ComingSoon from '../../components/ComingSoon.jsx';

export default function MessagesPage() {
  return (
    <ComingSoon title="Messages" owner="In-App Messaging">
      Real-time chat over Socket.io. Start from <code>src/lib/socket.js</code> and{' '}
      <code>server/src/socket/index.js</code>.
    </ComingSoon>
  );
}
