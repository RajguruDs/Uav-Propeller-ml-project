export default function Card({ children, className = '', hover = false, ...props }) {
  const baseStyles = 'bg-white rounded-xl shadow-md p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
