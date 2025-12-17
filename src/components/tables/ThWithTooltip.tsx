'use client';

type Props = {
  title: string;
  tooltip: string;
};

export default function ThWithTooltip({ title, tooltip }: Props) {
  return (
    <th className="position-relative">
      <span className="d-inline-flex align-items-center gap-1 tooltip-wrapper">
        {title}
        <span className="tooltip-icon">ℹ️</span>

        <span className="custom-tooltip">
          {tooltip}
        </span>
      </span>
    </th>
  );
}