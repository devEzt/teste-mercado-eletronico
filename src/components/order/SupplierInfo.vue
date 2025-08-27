<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
          <BuildingOfficeIcon class="h-5 w-5" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('labels.supplier') }}</h3>
      </div>
    </div>

    <div class="px-6 py-4">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between mb-4"
      >
        <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100">
          {{ supplier.name }}
        </h4>
        <span
          v-if="supplier.code"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-900 mt-2 md:mt-0"
        >
          #{{ supplier.code }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div v-if="supplier.document" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <DocumentTextIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ supplier.document.type }}
              </p>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ supplier.document.value }}</p>
            </div>
          </div>

          <div class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <MapPinIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.address') }}</p>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ supplier.address }}</p>
            </div>
          </div>

          <div v-if="supplier.contact?.name" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.contact') }}</p>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ supplier.contact.name }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div v-if="supplier.contact?.email" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <EnvelopeIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.email') }}</p>
              <a
                :href="`mailto:${supplier.contact.email}`"
                class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                {{ supplier.contact.email }}
              </a>
            </div>
          </div>

          <div v-if="supplier.contact?.phone" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <PhoneIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.phone') }}</p>
              <a
                :href="`tel:${supplier.contact.phone}`"
                class="text-sm text-gray-900 dark:text-gray-100"
              >
                {{ supplier.contact.phone }}
              </a>
            </div>
          </div>

          <div v-if="supplier.contact?.fax" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <PrinterIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.fax') }}</p>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ supplier.contact.fax }}</p>
            </div>
          </div>

          <div v-if="supplier.readAt" class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center"
            >
              <ClockIcon class="h-5 w-5 text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.viewedAt') }}</p>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ formatDate(supplier.readAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
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
})

const { locale } = useI18n()

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString(locale.value || "pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
