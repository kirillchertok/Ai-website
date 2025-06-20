const PaidPlanChat = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4">Premium Chat</h1>
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
        {/* Chat messages would go here */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
            <p>مرحبًا بك في الخطة المدفوعة! كيف يمكنني مساعدتك اليوم؟</p>
          </div>
        </div>
      </div>

      {/* Enhanced chat input with voice option */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="اكتب رسالتك هنا..."
            className="w-full p-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button className="bg-blue-500 text-white p-2 rounded-full">
              <span>إرسال</span>
            </button>
            <button className="bg-green-500 text-white p-2 rounded-full">
              <span>صوت</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidPlanChat;
