"use client";

import { useState } from "react";

type Email = {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  labels?: string[];
};

type Label = {
  id: string;
  name: string;
  color: string;
  count: number;
};

export default function Home() {
  // Sample email data
  const initialEmails: Email[] = [
    {
      id: "1",
      from: "Google",
      fromEmail: "no-reply@accounts.google.com",
      subject: "Security alert",
      body: "New sign-in on Windows device. We noticed a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything. If not, we'll help you secure your account.",
      date: "10:42 AM",
      read: false,
      starred: false,
      labels: ["Important"]
    },
    {
      id: "2",
      from: "GitHub",
      fromEmail: "notifications@github.com",
      subject: "New login to your GitHub account",
      body: "We noticed a new login to your GitHub account. If this was you, you don't need to do anything. If not, we'll help you secure your account.",
      date: "9:15 AM",
      read: true,
      starred: true,
      labels: ["Work"]
    },
    {
      id: "3",
      from: "Netflix",
      fromEmail: "info@netflix.com",
      subject: "New TV shows and movies added",
      body: "Check out the latest TV shows and movies added to Netflix this week. You might find something you like!",
      date: "Yesterday",
      read: true,
      starred: false
    },
    {
      id: "4",
      from: "Amazon",
      fromEmail: "orders@amazon.com",
      subject: "Your order has shipped",
      body: "Your order #106-7789955-1234567 has shipped. You can track your package with the tracking number: 1234567890.",
      date: "Jun 12",
      read: true,
      starred: false,
      labels: ["Purchases"]
    },
    {
      id: "5",
      from: "Twitter",
      fromEmail: "info@twitter.com",
      subject: "New login to your Twitter account",
      body: "We noticed a new login to your Twitter account. If this was you, you don't need to do anything. If not, we'll help you secure your account.",
      date: "Jun 10",
      read: true,
      starred: false
    },
    {
      id: "6",
      from: "LinkedIn",
      fromEmail: "messages-noreply@linkedin.com",
      subject: "You have a new message",
      body: "You have a new message from John Smith. Click here to read it.",
      date: "Jun 9",
      read: false,
      starred: true,
      labels: ["Social", "Work"]
    }
  ];

  const labels: Label[] = [
    { id: "inbox", name: "Inbox", color: "bg-blue-500", count: 6 },
    { id: "starred", name: "Starred", color: "bg-yellow-500", count: 2 },
    { id: "sent", name: "Sent", color: "bg-green-500", count: 0 },
    { id: "drafts", name: "Drafts", color: "bg-gray-500", count: 3 },
    { id: "spam", name: "Spam", color: "bg-red-500", count: 1 },
    { id: "trash", name: "Trash", color: "bg-gray-700", count: 0 }
  ];

  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStar = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  const toggleRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    ));
  };

  const filteredEmails = emails.filter(email => {
    if (searchQuery) {
      return (
        email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedLabel === "starred") {
      return email.starred;
    }
    
    return true;
  });

  return (
    <div className="flex h-screen bg-[#0B121F]">
      {/* Sidebar */}
      <div className="w-64 bg-[#151E2D] border-r border-gray-800 flex flex-col">
        {/* Compose button */}
        <div className="p-4">
          <button className="bg-[rgb(11,38,90)] hover:bg-blue-700 text-white rounded-full px-4 py-3 flex items-center justify-center shadow-md w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Compose
          </button>
        </div>

        {/* Labels */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            {labels.map(label => (
              <div
                key={label.id}
                className={`flex items-center px-4 py-2 rounded-r-full cursor-pointer transition-colors ${
                  selectedLabel === label.id ? "bg-blue-900/30 font-medium text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setSelectedLabel(label.id)}
              >
                <div className={`w-3 h-3 rounded-full ${label.color} mr-3`}></div>
                <span className="flex-1">{label.name}</span>
                {label.count > 0 && (
                  <span className="text-xs text-gray-400">{label.count}</span>
                )}
              </div>
            ))}
          </div>

          {/* Labels section */}
          <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Labels
          </div>
          <div className="px-2 py-2">
            <div className="flex items-center px-4 py-2 rounded-r-full cursor-pointer text-gray-300 hover:bg-gray-800">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
              <span className="flex-1">Work</span>
            </div>
            <div className="flex items-center px-4 py-2 rounded-r-full cursor-pointer text-gray-300 hover:bg-gray-800">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <span className="flex-1">Personal</span>
            </div>
            <div className="flex items-center px-4 py-2 rounded-r-full cursor-pointer text-gray-300 hover:bg-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
              <span className="flex-1">Important</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Search bar */}
        <div className="bg-[#151E2D] p-4 border-b border-gray-800 flex items-center">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search mail"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-[#0B121F] placeholder-gray-500 text-white focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Email list and content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Email list */}
          <div className="w-1/2 bg-[#151E2D] border-r border-gray-800 overflow-y-auto">
            {/* Action buttons */}
            <div className="flex items-center p-2 border-b border-gray-800">
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded ml-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded ml-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded ml-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="flex-1"></div>
              <span className="text-xs text-gray-400">1-{filteredEmails.length} of {filteredEmails.length}</span>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded ml-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Email items */}
            <div className="divide-y divide-gray-800">
              {filteredEmails.map(email => (
                <div
                  key={email.id}
                  className={`flex items-start p-3 cursor-pointer hover:bg-gray-800/50 ${
                    !email.read ? 'bg-blue-900/20' : ''
                  } ${
                    selectedEmail?.id === email.id ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <button
                    className="mr-3 text-gray-500 hover:text-yellow-400 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(email.id);
                    }}
                  >
                    <svg
                      className={`w-5 h-5 ${email.starred ? 'text-yellow-400 fill-current' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium truncate ${!email.read ? 'text-white font-bold' : 'text-gray-300'}`}>
                        {email.from}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{email.date}</span>
                    </div>
                    <p className={`text-sm truncate ${!email.read ? 'text-white font-medium' : 'text-gray-400'}`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{email.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email content */}
          <div className="w-1/2 bg-[#151E2D] p-4 overflow-y-auto">
            {selectedEmail ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEmail.subject}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm font-medium text-white">{selectedEmail.from}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{selectedEmail.fromEmail}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{selectedEmail.date}</span>
                </div>

                <div className="prose max-w-none mb-6 text-gray-300">
                  <p>{selectedEmail.body}</p>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 text-sm font-medium">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 text-sm font-medium">
                      Forward
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-300">No email selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select an email from your inbox to read it</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}