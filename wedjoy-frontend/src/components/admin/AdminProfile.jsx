import React from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Calendar } from 'lucide-react';

const AdminProfile = () => {
  const adminData = {
    name: 'Emma Rodriguez',
    role: 'Senior System Administrator',
    email: 'emma.rodriguez@company.com',
    phone: '+1 (555) 123-4567',
    department: 'IT Infrastructure',
    location: 'San Francisco, CA',
    startDate: 'July 15, 2019',
    profileImage: '/api/placeholder/200/200',
    aboutMe: 'Experienced IT professional with 8+ years of system administration and network management expertise. Passionate about implementing cutting-edge technological solutions and ensuring robust system security.',
    skills: ['Network Security', 'Cloud Management', 'System Architecture', 'Cybersecurity', 'DevOps'],
    recentProjects: [
      { name: 'Enterprise Cloud Migration', status: 'Completed' },
      { name: 'Cybersecurity Enhancement', status: 'In Progress' },
      { name: 'Network Infrastructure Upgrade', status: 'Planning' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Sidebar with Profile Image */}
        <div className="w-1/3 bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
          <img 
            src={adminData.profileImage} 
            alt={adminData.name} 
            className="w-48 h-48 rounded-full border-4 border-white object-cover mb-6 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-center">{adminData.name}</h2>
          <p className="text-blue-100 text-center mt-2">{adminData.role}</p>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {/* Personal Information */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="mr-3 text-blue-500" size={20} />
                <span>{adminData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-blue-500" size={20} />
                <span>{adminData.phone}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-3 text-blue-500" size={20} />
                <span>{adminData.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 text-blue-500" size={20} />
                <span>{adminData.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-3 text-blue-500" size={20} />
                <span>Start Date: {adminData.startDate}</span>
              </div>
            </div>
          </section>

          {/* About Me */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
              About Me
            </h3>
            <p className="text-gray-700">{adminData.aboutMe}</p>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {adminData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Recent Projects */}
          <section>
            <h3 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
              Recent Projects
            </h3>
            <div className="space-y-3">
              {adminData.recentProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-blue-50 p-4 rounded-lg flex justify-between items-center"
                >
                  <span className="font-medium">{project.name}</span>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : project.status === 'In Progress' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;