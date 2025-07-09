"use client";

import { useState, useMemo } from "react";
import { Advocate } from "../types/advocate";

interface AdvocateTableProps {
  advocates: Advocate[];
}

export default function AdvocateTable({ advocates }: AdvocateTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredAdvocates = useMemo(() => {
    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) return advocates;
    
    return advocates.filter((advocate: Advocate) => {
      const lowerSearchTerm = trimmedSearch.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some(specialty => specialty.toLowerCase().includes(lowerSearchTerm))
      );
    });
  }, [advocates, searchTerm]);

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Advocates
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, location, specialty, or credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          {searchTerm && (
            <div className="flex flex-col justify-end">
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-600">
          {searchTerm ? (
            <span>
              Found <strong>{filteredAdvocates.length}</strong> advocates matching &quot;{searchTerm}&quot;
            </span>
          ) : (
            <span>Showing <strong>{advocates.length}</strong> available advocates</span>
          )}
        </div>
      </div>

      {/* No Results */}
      {filteredAdvocates.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No advocates found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse all advocates.</p>
        </div>
      )}

      {/* Advocate Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAdvocates.map((advocate, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">
                Dr. {advocate.firstName} {advocate.lastName}
              </h3>
              <p className="text-blue-100 text-sm">{advocate.degree}</p>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Location & Experience */}
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <span className="flex items-center">
                  📍 {advocate.city}
                </span>
                <span className="flex items-center">
                  ⏱️ {advocate.yearsOfExperience} years
                </span>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                <div className="space-y-1">
                  {advocate.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="inline-block mr-1 mb-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {advocate.specialties.length > 3 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{advocate.specialties.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    📞 {advocate.phoneNumber}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Help */}
      {filteredAdvocates.length > 0 && (
        <div className="text-center py-6">
          <p className="text-gray-600 text-sm">
            Need help choosing the right advocate?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
