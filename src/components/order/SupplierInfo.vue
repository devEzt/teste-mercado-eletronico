<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
          <BuildingOfficeIcon class="h-5 w-5" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">Fornecedor</h3>
      </div>
    </div>

    <div class="px-6 py-4">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between mb-4"
      >
        <h4 class="text-xl font-bold text-gray-900">
          {{ supplier.name }}
        </h4>
        <span
          v-if="supplier.code"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2 md:mt-0"
        >
          #{{ supplier.code }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-4">
          <!-- Document -->
          <div v-if="supplier.document" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <DocumentTextIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                {{ supplier.document.type }}
              </p>
              <p class="text-sm text-gray-900">{{ supplier.document.value }}</p>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <MapPinIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Endereço</p>
              <p class="text-sm text-gray-900">{{ supplier.address }}</p>
            </div>
          </div>

          <!-- Contact -->
          <div v-if="supplier.contact?.name" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Contato</p>
              <p class="text-sm text-gray-900">{{ supplier.contact.name }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <!-- Email -->
          <div v-if="supplier.contact?.email" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <EnvelopeIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Email</p>
              <a
                :href="`mailto:${supplier.contact.email}`"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                {{ supplier.contact.email }}
              </a>
            </div>
          </div>

          <!-- Phone -->
          <div v-if="supplier.contact?.phone" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <PhoneIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Telefone</p>
              <a
                :href="`tel:${supplier.contact.phone}`"
                class="text-sm text-gray-900"
              >
                {{ supplier.contact.phone }}
              </a>
            </div>
          </div>

          <!-- Fax -->
          <div v-if="supplier.contact?.fax" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <PrinterIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Fax</p>
              <p class="text-sm text-gray-900">{{ supplier.contact.fax }}</p>
            </div>
          </div>

          <!-- Read At -->
          <div v-if="supplier.readAt" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center"
            >
              <ClockIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Visualizado em</p>
              <p class="text-sm text-gray-900">
                {{ formatDate(supplier.readAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  PrinterIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
