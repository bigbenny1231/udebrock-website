"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  ChevronDown,
  Palette,
  ExternalLink,
} from "lucide-react";

interface ColorSelection {
  primaryColor: string;
  secondaryColor: string;
  stainColor: string;
  needsColorHelp: boolean;
  colorPreviewImage: string | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  colorSelection: ColorSelection;
}

const projectTypes = [
  "Interior project",
  "Exterior project",
  "Cabinet project",
];

const woodProjectTypes = [
  "Exterior project",
  "Cabinet project",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [colorPreview, setColorPreview] = useState<string | null>(null);
  const [isColorSectionOpen, setIsColorSectionOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      colorSelection: {
        primaryColor: "",
        secondaryColor: "",
        stainColor: "",
        needsColorHelp: false,
        colorPreviewImage: null,
      },
    },
  });

  const selectedProjectType = watch("projectType");
  const showStainField = woodProjectTypes.includes(selectedProjectType);
  const needsColorHelp = watch("colorSelection.needsColorHelp");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];

    for (let i = 0; i < Math.min(files.length, 5 - uploadedImages.length); i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) continue;

      const base64 = await fileToBase64(file);
      newImages.push(base64);
    }

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleColorPreviewUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 5 * 1024 * 1024) return;

    const base64 = await fileToBase64(file);
    setColorPreview(base64);
    setValue("colorSelection.colorPreviewImage", base64);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        ...data,
        images: uploadedImages,
        colorSelection: {
          ...data.colorSelection,
          colorPreviewImage: colorPreview,
        },
      };

      const response = await fetch(process.env.NEXT_PUBLIC_GAS_URL || "", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === "success") {
        setSubmitStatus("success");
        reset();
        setUploadedImages([]);
        setColorPreview(null);
        setIsColorSectionOpen(false);

        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-walnut-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-antique-600 font-semibold mb-4"
            >
              Get Started
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-forest-700 mb-4"
            >
              Request Your Free Estimate
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-walnut-600"
            >
              Tell us about your project and we&apos;ll get back to you within
              24 hours
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-cream rounded-2xl shadow-lg p-8 md:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-walnut-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-walnut-200 focus:border-forest-500"
                    } bg-white focus:outline-none`}
                    placeholder="John Smith"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-walnut-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-walnut-200 focus:border-forest-500"
                    } bg-white focus:outline-none`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Project Type Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-walnut-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border-2 border-walnut-200 focus:border-forest-500 bg-white focus:outline-none transition-colors"
                    placeholder="(989) 619-3317"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-walnut-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    {...register("projectType", {
                      required: "Please select a project type",
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.projectType
                        ? "border-red-400 focus:border-red-500"
                        : "border-walnut-200 focus:border-forest-500"
                    } bg-white focus:outline-none`}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-walnut-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  {...register("message", {
                    required: "Please describe your project",
                    maxLength: {
                      value: 1000,
                      message: "Maximum 1000 characters",
                    },
                  })}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-walnut-200 focus:border-forest-500"
                  } bg-white focus:outline-none resize-none`}
                  placeholder="Tell us about your project - deck size, current condition, what you're looking for..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Project Photos Upload */}
              <div>
                <label className="block text-sm font-semibold text-walnut-700 mb-2">
                  Project Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-walnut-200 rounded-lg p-6 text-center hover:border-forest-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadedImages.length >= 5}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer ${
                      uploadedImages.length >= 5 ? "opacity-50" : ""
                    }`}
                  >
                    <Upload className="w-8 h-8 mx-auto text-walnut-400 mb-2" />
                    <p className="text-walnut-600">
                      {uploadedImages.length >= 5
                        ? "Maximum 5 photos uploaded"
                        : "Click or drag photos of your project"}
                    </p>
                    <p className="text-sm text-walnut-400 mt-1">
                      PNG, JPG up to 5MB each (max 5 photos)
                    </p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <img
                          src={img}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Selection Section */}
              <div className="border border-walnut-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsColorSectionOpen(!isColorSectionOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-forest-50 hover:bg-forest-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-forest-600" />
                    <span className="font-semibold text-forest-700">
                      Color Selection (Optional)
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-forest-600 transition-transform ${
                      isColorSectionOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isColorSectionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-4 bg-white">
                        <p className="text-sm text-walnut-600">
                          Already picked your colors? Add them here for a more
                          accurate estimate.
                        </p>

                        <div>
                          <label className="block text-sm font-medium text-walnut-700 mb-1">
                            Primary Color
                          </label>
                          <input
                            {...register("colorSelection.primaryColor")}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-walnut-200 focus:border-forest-500 focus:outline-none"
                            placeholder="e.g., Agreeable Gray SW 7029"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-walnut-700 mb-1">
                            Secondary / Accent Color
                          </label>
                          <input
                            {...register("colorSelection.secondaryColor")}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-walnut-200 focus:border-forest-500 focus:outline-none"
                            placeholder="e.g., Extra White SW 7006"
                          />
                        </div>

                        {showStainField && (
                          <div>
                            <label className="block text-sm font-medium text-walnut-700 mb-1">
                              Stain Color
                            </label>
                            <input
                              {...register("colorSelection.stainColor")}
                              type="text"
                              className="w-full px-4 py-2 rounded-lg border border-walnut-200 focus:border-forest-500 focus:outline-none"
                              placeholder="e.g., SuperDeck Cedar Naturaltone"
                            />
                          </div>
                        )}

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register("colorSelection.needsColorHelp")}
                            className="w-5 h-5 rounded border-walnut-300 text-forest-600 focus:ring-forest-500"
                          />
                          <span className="text-walnut-700">
                            I need help choosing colors
                          </span>
                        </label>

                        {needsColorHelp && (
                          <p className="text-sm text-forest-600 bg-forest-50 p-3 rounded-lg">
                            No problem! We&apos;ll connect you with
                            Sherwin-Williams&apos; free color consultation
                            service.
                          </p>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-walnut-700 mb-1">
                            Upload Color Preview Screenshot
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleColorPreviewUpload}
                            className="hidden"
                            id="color-preview-upload"
                          />
                          <label
                            htmlFor="color-preview-upload"
                            className="block border border-dashed border-walnut-200 rounded-lg p-4 text-center cursor-pointer hover:border-forest-400 transition-colors"
                          >
                            {colorPreview ? (
                              <img
                                src={colorPreview}
                                alt="Color preview"
                                className="max-h-32 mx-auto rounded"
                              />
                            ) : (
                              <span className="text-sm text-walnut-500">
                                Upload screenshot from ColorSnap Visualizer
                              </span>
                            )}
                          </label>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <a
                            href="https://www.sherwin-williams.com/visualizer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-forest-600 hover:text-forest-700"
                          >
                            Explore Colors{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href="https://www.sherwin-williams.com/en-us/virtual-color-consultation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-forest-600 hover:text-forest-700"
                          >
                            Free Consultation{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 bg-antique-500 hover:bg-antique-400 text-walnut-900 font-semibold py-4 px-6 rounded-lg transition-colors text-lg ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-walnut-800 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Request
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Request Sent!
                      </p>
                      <p className="text-sm text-green-700">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">
                        Something went wrong
                      </p>
                      <p className="text-sm text-red-700">
                        Please try again or call us directly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
