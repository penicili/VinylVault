import React, { useState } from 'react';

const TransactionList = ({ transactions, onReturn, getAlbumTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Create a handleReturn function to ensure proper logging
  const handleReturn = (transactionId) => {
    console.log(`Returning album with transaction ID: ${transactionId}`);
    onReturn(transactionId);
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="bg-white p-4 border-b border-gray-300 mb-2 flex justify-between items-center">
        <h3 className="text-xl font-semibold">All Transactions</h3>
        <button 
          className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <>
              <span className="mr-1">Hide</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          ) : (
            <>
              <span className="mr-1">Show</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      <div 
        className={`flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${isVisible 
            ? 'opacity-100 max-h-[5000px]' 
            : 'opacity-0 max-h-0 overflow-hidden'
          }`}
      >
        {transactions && transactions.length > 0 ? (
          transactions
            .map((item) => (
              <div 
                key={item.transaction_id} 
                className="flex justify-between items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <p className="font-medium text-gray-800">id#{item.transaction_id}</p>
                <p className="text-gray-600">
                  Title: {getAlbumTitle(item.album_id)} | 
                  Date: {new Date(item.created_at).toLocaleDateString()}
                </p>

                {item.is_returned === false ? (
                  <button 
                    className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-green-500 transition duration-300 border border-gray-300 text-green-500 hover:text-white"
                    onClick={() => handleReturn(item.transaction_id)}
                  > 
                    Return
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md">
                    Returned
                  </span>
                )}
              </div>
            ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No active transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;