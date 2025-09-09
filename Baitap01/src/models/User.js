const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User {
  constructor(data = {}) {
    this.id = data.id || uuidv4();
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.age = data.age || null;
    this.gender = data.gender || '';
    this.address = data.address || '';
    this.password = data.password || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate user data
  validate() {
    const errors = [];

    if (!this.firstName || this.firstName.trim().length < 2) {
      errors.push('First name must be at least 2 characters long');
    }

    if (!this.lastName || this.lastName.trim().length < 2) {
      errors.push('Last name must be at least 2 characters long');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }

    if (this.phone && !this.isValidPhone(this.phone)) {
      errors.push('Valid phone number is required');
    }

    if (this.age && (this.age < 1 || this.age > 120)) {
      errors.push('Age must be between 1 and 120');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  // Hash password
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Compare password
  async comparePassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Convert to JSON (exclude password)
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }

  // Update user data
  update(data) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && key !== 'id' && key !== 'createdAt') {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date();
  }
}

module.exports = User;