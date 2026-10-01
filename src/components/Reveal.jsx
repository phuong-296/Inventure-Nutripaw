import { useEffect, useRef, useState } from 'react'

/**
 * Bọc ngoài để tạo hiệu ứng cuộn-tới-đâu-hiện-tới-đó: mờ dần + trượt lên khi
 * phần tử con lọt vào khung nhìn. Chỉ dùng CSS transition, bật/tắt bởi 1 cờ
 * từ IntersectionObserver, nên nếu JS load chậm thì nội dung vẫn hiện sẵn
 * bình thường (không bị kẹt ẩn mãi).
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  // ref trỏ tới phần tử DOM thật để IntersectionObserver theo dõi
  const ref = useRef(null)
  // true khi phần tử đã từng lọt vào khung nhìn - chỉ bật 1 lần, không tắt
  // lại khi cuộn ra ngoài (hiệu ứng "xuất hiện" chỉ chạy đúng 1 lần)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // Đã hiện rồi thì ngắt theo dõi luôn, đỡ tốn tài nguyên vì mục
          // đích chỉ là chạy hiệu ứng 1 lần duy nhất
          observer.disconnect()
        }
      },
      // threshold 0.15: cần thấy ít nhất 15% phần tử mới coi là "đã vào khung nhìn"
      // rootMargin âm 40px ở dưới: kích hoạt sớm hơn 1 chút trước khi chạm đáy màn hình
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      // delay cho phép nhiều Reveal xếp cạnh nhau (vd danh sách thẻ) chạy
      // hiệu ứng lệch nhau 1 chút thay vì bật cùng lúc, nhìn mượt hơn
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
