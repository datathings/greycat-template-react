import { useCallback, useEffect, useState } from 'react';
import { prettyError, runtime } from '@greycat/web';
import { WCWrapper } from './WCWrapper';
import s from './ReactPage.module.css';

function useRuntimeInfo() {
  const [data, setData] = useState<runtime.RuntimeInfo | string>('loading...');

  const load = useCallback(async function api() {
    try {
      setData('loading...');
      const info = await runtime.Runtime.info();
      setData(info);
    } catch (err) {
      setData(prettyError(err, 'something went wrong'));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return [data, load] as const;
}

export function ReactPage() {
  const [count, setCount] = useState(0);
  const [info, reload] = useRuntimeInfo();

  return (
    <div className="container-fluid">
      <div className="grid">
        <article>
          <header>Counter</header>
          <div className="container-fluid">
            This component is actually a React component:
            <button onClick={() => setCount((v) => v - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount((v) => v + 1)}>+</button>
          </div>
        </article>
        <article>
          <header className={s.runtimeInfoHeader}>
            <span>RuntimeInfo</span>
            <button role="link" onClick={reload}>
              Reload
            </button>
          </header>
          <div className="container-fluid">
            <WCWrapper tag="gui-object" value={info} />
          </div>
        </article>
      </div>
    </div>
  );
}
