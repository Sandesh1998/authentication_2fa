const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const OTPAuth = require("otpauth");
const { encode } = require("hi-base32");
const QRCode = require("qrcode");
const crypto = require("crypto");

class UserService {
  static async create(createUserDto) {
    const { username, email, password, enable2fa } = createUserDto;
    const user = await User.findOne({ email });
    if (user) {
      return {
        status: "fail",
        message: "User already exists",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      enable2fa,
    });
    await newUser.save();

    return {
      status: "success",
      message: "User created successfully",
      data: newUser,
    };
  }

  //  to enable two-way authentication
  static async enableTwoWayAuth(userDto) {
    const { userId } = userDto;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return {
        status: "fail",
        message: "User not found",
      };
    }

    // generate a secret key for the user
    const buffer = crypto.randomBytes(15);
    const base32_secret = encode(buffer).replace(/=/g, "").substring(0, 24);

    // save the secret key to the user's document
    await User.findByIdAndUpdate(
      { _id: userId },
      { secrets2fa: base32_secret }
    );

    // generate the otpauth URL
    let totp = new OTPAuth.TOTP({
      issuer: "sandehpoudel1998.com.np",
      label: "2fa",
      algorithm: "SHA1",
      digits: 6,
      secret: base32_secret,
    });
    const otpauth_url = totp.toString();

    // generate and send a QR code as a response
    let qrCodeData;
    try {
      qrCodeData = await QRCode.toDataURL(otpauth_url);
    } catch (err) {
      return {
        status: "error",
        message: "Error generating QR code",
      };
    }

    return {
      status: "success",
      message: "QR code generated successfully",
      data: {
        qr_code: qrCodeData,
        secret: base32_secret,
      },
    };
  }

  // to verify the two-way authentication code
  static async verifyTwoWayAuth(userDto) {
    const { userId, token } = userDto;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return {
        status: "fail",
        message: "User not found",
      };
    }

    // validate the token
    let totp = new OTPAuth.TOTP({
      issuer: "sandehpoudel1998.com.np",
      label: "2fa",
      algorithm: "SHA1",
      digits: 6,
      secret: user.secrets2fa,
    });

    // Specify the number of time steps the token is valid
    const isValid = totp.validate({ token });

    if (isValid === null) {
      return {
        status: "fail",
        message: "Invalid token",
      };
    }
    if (!user.enable2fa) {
      await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          enable2fa: true,
        }
      );
    }

    return {
      status: "success",
      data: {
        message: "Two-way authentication enabled successfully",
       enable2fa:user.enable2fa
      },
    };
  }
}

module.exports = UserService;
