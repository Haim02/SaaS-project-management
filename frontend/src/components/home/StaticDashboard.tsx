
const StaticDashboard = () => {
  return (
    <div className="mt-3 bg-white rounded-xl shadow p-2 space-y-30">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-xs text-gray-500">פרויקטים פעילים</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">84%</div>
          <div className="text-xs text-gray-500">התקדמות</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">5</div>
          <div className="text-xs text-gray-500">משימות קריטיות</div>
        </div>
      </div>

      <div className="h-24 flex items-end space-x-1 rtl:space-x-reverse">
        <div className="flex-1 bg-blue-200 rounded-t h-30"></div>
        <div className="flex-1 bg-blue-400 rounded-t h-36"></div>
        <div className="flex-1 bg-blue-300 rounded-t h-32"></div>
        <div className="flex-1 bg-blue-500 rounded-t h-30"></div>
        <div className="flex-1 bg-blue-300 rounded-t h-34"></div>
      </div>

      <div className="text-xs text-gray-400 text-center">
        תצוגת דשבורד
      </div>
    </div>
  );
}

export default StaticDashboard
