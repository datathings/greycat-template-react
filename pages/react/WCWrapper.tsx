import React from 'react';

export interface WCWrapperProps<K> {
  /** the name of the WebComponent element */
  tag: K;
}

function WCWrapperInner<K extends keyof HTMLElementTagNameMap>(
  { tag, ...props }: WCWrapperProps<K>,
  ref: React.ForwardedRef<HTMLElementTagNameMap[K]>
) {
  const wcRef = React.useRef<HTMLElementTagNameMap[K] | null>(null);

  React.useEffect(() => {
    const r = ref ?? wcRef;
    if (r && 'current' in r && r.current !== null) {
      if ('setAttrs' in r.current && typeof r.current.setAttrs === 'function') {
        r.current.setAttrs(props); // batch rendering in 1 method call
        return;
      }

      for (const [key, value] of Object.entries(props)) {
        // properties take precedence over attributes
        if (key in r.current) {
          // the comparison is '!==' which only works for primitives & references
          if (r.current[key] !== value) {
            r.current[key] = value;
          }
        }
      }
    }
  }, [props, ref, wcRef]);

  return React.createElement(tag, { ref: ref ?? wcRef });
}

export const WCWrapper = React.memo(React.forwardRef(WCWrapperInner)) as <
  K extends keyof HTMLElementTagNameMap
>(
  props: WCWrapperProps<K> &
    React.RefAttributes<HTMLElementTagNameMap[K]> &
    Omit<Partial<HTMLElementTagNameMap[K]>, 'setAttrs'>
) => React.ReactElement;
