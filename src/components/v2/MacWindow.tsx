// janela de Mac usada para mostrar sites e sistemas; os três pontos são os "pontos de cor" do layout
export default function MacWindow({
  title,
  light = false,
  className = '',
  bodyClassName = '',
  children,
}: {
  title?: string;
  light?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`v2-win${light ? ' v2-win--light' : ''} ${className}`}>
      <div className="v2-win__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        {title ? <em className="v2-win__title">{title}</em> : null}
      </div>
      <div className={`v2-win__body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
