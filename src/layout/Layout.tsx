export type LayoutProps = {
  children: any;
  title?: string;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return <div>{children}</div>;
}
