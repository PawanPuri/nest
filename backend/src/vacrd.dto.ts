export class CreateVCardDto {
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
    readonly nickname?: string;
    readonly company?: string;
    readonly jobTitle?: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly websiteURL?: string;
    readonly workURL?: string;
    readonly homePageURL?: string;
    readonly address?: string;
    readonly landmark?: string;
    readonly imageUrl?: string;  // Accept image URL
    readonly qrCode?: string;  // Accept QR code as part of the DTO
  }
  