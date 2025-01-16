import { Spinner } from '@/components/ui/spinner';
import Countdown, { zeroPad } from 'react-countdown';

export default function OTPCounter({ handleDate, loading }: any) {
  return (
    <Countdown
      //   key={ReRender}
      date={Date.now() + 1000 * 300}
      zeroPadTime={2}
      renderer={({ minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return (
            <span
              className="font-normal cursor-pointer underline"
              onClick={handleDate}
            >
              {loading ? (
                <Spinner size="small" className="ml-1" />
              ) : (
                'Kirim Ulang'
              )}
            </span>
          );
        } else {
          // Render a countdown
          return (
            <span>
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
          );
        }
      }}
    />
  );
}
