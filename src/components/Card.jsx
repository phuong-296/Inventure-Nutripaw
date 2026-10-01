/**
 * Khối nền trắng bo góc dùng chung cho form auth và các khối nội dung ở
 * trang chủ landing (thẻ tính năng, thẻ bước, panel newsletter).
 */
export default function Card({ as: Component = 'div', className = '', children, ...rest }) {
  return (
    <Component
      className={`bg-white border border-border-light rounded-xl2 ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
