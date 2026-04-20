interface BadgeProps {
  numero: number;
}

export default function Badge({ numero }: BadgeProps) {
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold bg-gradient-to-br from-indigo-500 to-purple-600">
      {numero}
    </span>
  );
}