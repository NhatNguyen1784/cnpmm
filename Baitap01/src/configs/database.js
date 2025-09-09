// Mock Database - In production, use MongoDB, MySQL, PostgreSQL, etc.
const User = require('../models/User');

class Database {
  constructor() {
    this.users = [];
    this.initializeData();
  }

  // Initialize with sample data
  initializeData() {
    const sampleUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        age: 30,
        gender: 'male',
        address: '123 Main St, New York, NY'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1234567891',
        age: 28,
        gender: 'female',
        address: '456 Oak Ave, Los Angeles, CA'
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1234567892',
        age: 35,
        gender: 'male',
        address: '789 Pine St, Chicago, IL'
      }
    ];

    sampleUsers.forEach(userData => {
      const user = new User(userData);
      this.users.push(user);
    });
  }

  // Get all users
  getAllUsers() {
    return this.users.map(user => user.toJSON());
  }

  // Get user by ID
  getUserById(id) {
    const user = this.users.find(user => user.id === id);
    return user ? user.toJSON() : null;
  }

  // Get user by email
  getUserByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user ? user.toJSON() : null;
  }

  // Create new user
  createUser(userData) {
    const user = new User(userData);
    const validation = user.validate();
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // Check if email already exists
    if (this.getUserByEmail(user.email)) {
      throw new Error('Email already exists');
    }

    this.users.push(user);
    return user.toJSON();
  }

  // Update user
  updateUser(id, userData) {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Check if email already exists for other users
    if (userData.email && userData.email !== this.users[userIndex].email) {
      const existingUser = this.getUserByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    this.users[userIndex].update(userData);
    const validation = this.users[userIndex].validate();
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return this.users[userIndex].toJSON();
  }

  // Delete user
  deleteUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUser = this.users[userIndex].toJSON();
    this.users.splice(userIndex, 1);
    return deletedUser;
  }

  // Search users
  searchUsers(query) {
    const searchTerm = query.toLowerCase();
    return this.users.filter(user => {
      return user.firstName.toLowerCase().includes(searchTerm) ||
             user.lastName.toLowerCase().includes(searchTerm) ||
             user.email.toLowerCase().includes(searchTerm) ||
             user.phone.includes(searchTerm);
    }).map(user => user.toJSON());
  }

  // Get users with pagination
  getUsersWithPagination(page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const users = this.users.slice(startIndex, endIndex).map(user => user.toJSON());
    const total = this.users.length;
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers: total,
        hasNext: endIndex < total,
        hasPrev: startIndex > 0
      }
    };
  }
}

// Export singleton instance
module.exports = new Database();