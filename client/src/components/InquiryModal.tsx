/**
 * DESIGN PHILOSOPHY: Romantic Minimalism
 * Modal with blurred background, ivory card, crimson headings, gold accents
 * Dual submission options: WhatsApp and Email
 */

import { useState } from "react";
import { X, MessageCircle, Mail } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<"whatsapp" | "email" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (method: "whatsapp" | "email") => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setSubmitMethod(method);

    // Format the message
    const message = `
*HONEYMOON PACKAGE INQUIRY*

*Client Information:*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

*Package Details:*
Package: ${packageName}
Price: ${packagePrice}
Preferred Travel Date: ${formData.travelDate || "Not specified"}

*Additional Message:*
${formData.message || "No additional message"}

---
Submitted via Luxe & Allure Website
    `.trim();

    try {
      if (method === "whatsapp") {
        // WhatsApp API - encode the message
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/254727937010?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
      } else if (method === "email") {
        // Email submission - send to backend or use mailto
        const emailBody = encodeURIComponent(message);
        const emailSubject = encodeURIComponent(
          `Honeymoon Inquiry - ${packageName}`
        );
        window.location.href = `mailto:info@luxeandallureevents.co.ke?subject=${emailSubject}&body=${emailBody}`;
      }

      // Reset form after submission
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          travelDate: "",
          message: "",
        });
        setSubmitMethod(null);
        setSubmitting(false);
        onClose();
      }, 500);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred background */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        style={{ backdropFilter: "blur(8px)" }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: "#FAF8F5" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            style={{ color: "#8B1A1A" }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <p
                className="font-script text-2xl mb-2"
                style={{ color: "#C9A96E" }}
              >
                Let's Plan Your Escape
              </p>
              <h2
                className="font-display text-3xl font-light"
                style={{ color: "#8B1A1A" }}
              >
                {packageName}
              </h2>
              <div
                className="h-px w-16 mt-3"
                style={{ backgroundColor: "#C9A96E" }}
              />
              <p
                className="font-body text-sm mt-3"
                style={{ color: "#2D2D2D", opacity: 0.7 }}
              >
                Starting from <span className="font-semibold">{packagePrice}</span>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4 mb-6">
              {/* Full Name */}
              <div>
                <label
                  className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                  style={{ color: "#8B1A1A" }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-b bg-transparent py-2.5 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                  style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                  style={{ color: "#8B1A1A" }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b bg-transparent py-2.5 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                  style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                  style={{ color: "#8B1A1A" }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b bg-transparent py-2.5 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                  style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                  placeholder="+254 7XX XXX XXX"
                />
              </div>

              {/* Travel Date */}
              <div>
                <label
                  className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                  style={{ color: "#8B1A1A" }}
                >
                  Preferred Travel Date
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full border-b bg-transparent py-2.5 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                  style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                  style={{ color: "#8B1A1A" }}
                >
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border-b bg-transparent py-2.5 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors resize-none"
                  style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                  placeholder="Tell us about your preferences..."
                />
              </div>
            </form>

            {/* Submission options */}
            <div className="space-y-3">
              {/* WhatsApp button */}
              <button
                onClick={() => handleSubmit("whatsapp")}
                disabled={submitting && submitMethod === "whatsapp"}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-body text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  opacity: submitting && submitMethod === "whatsapp" ? 0.7 : 1,
                }}
              >
                <MessageCircle className="w-4 h-4" />
                {submitting && submitMethod === "whatsapp"
                  ? "Sending..."
                  : "Send via WhatsApp"}
              </button>

              {/* Email button */}
              <button
                onClick={() => handleSubmit("email")}
                disabled={submitting && submitMethod === "email"}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-body text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "#8B1A1A",
                  color: "#FAF8F5",
                  border: "1px solid #C9A96E",
                  opacity: submitting && submitMethod === "email" ? 0.7 : 1,
                }}
              >
                <Mail className="w-4 h-4" />
                {submitting && submitMethod === "email"
                  ? "Sending..."
                  : "Send via Email"}
              </button>
            </div>

            {/* Footer note */}
            <p
              className="font-body text-xs text-center mt-4"
              style={{ color: "#2D2D2D", opacity: 0.6 }}
            >
              We respond within 24 hours. Your information is secure and will only be used to contact you about your honeymoon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
