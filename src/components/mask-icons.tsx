type MaskIconProps = {
  src: string;
  className?: string;
};

export function MaskIcons({ src, className }: MaskIconProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
