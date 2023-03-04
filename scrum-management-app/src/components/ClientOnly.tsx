import { useEffect, useState } from "react";

export type ClientOnlyProps = {
  children?: any;
  delegated?: any;
};

const ClientOnly = ({ children, ...delegated }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
