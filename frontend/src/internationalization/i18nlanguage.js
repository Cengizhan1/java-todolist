import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en:
            {
                translations: {
                    'id': 'ID',
                    'task_name': 'Task Name',
                    'task_description': 'Task Description', // Eklenen alan
                    'task_state': 'Task State', // Eklenen alan
                    'priority_level': 'Priority Level', // Eklenen alan
                    'due_date': 'Due Date', // Eklenen alan
                    'tags': 'Tags', // Eklenen alan
                    'date': 'Date',
                    'update': 'Update',
                    'delete': 'Delete',
                    'view': 'View',
                    'create': 'Create',
                    'task_list': "Task List",
                    'task_create': "Create Task",
                    'task_update': "Update Task",
                    'task_delete': "Delete Task",
                    'all_delete': "Delete All Tasks",
                    'all_done_task_delete': "Delete All Done Tasks",
                    'logout':"Logout",
                    'welcome':"Welcomne :"


                }
            },
        tr:
            {
                translations: {
                    'id': 'ID',
                    'task_name': 'Task Adı',
                    'task_description': 'Task Açıklaması',
                    'task_state': 'Task Durumu',
                    'priority_level': 'Öncelik Seviyesi',
                    'due_date': 'Son Tarih',
                    'tags': 'Etiketler',
                    'date': 'Tarih',
                    'update': 'Güncelle',
                    'delete': 'Sil',
                    'view': 'Göster',
                    'create': 'Ekle',
                    'task_list': "Tasklar",
                    'task_create': "Task Ekle",
                    'task_update': "Task Güncelle",
                    'task_delete': "Task Sil",
                    'all_delete': "Hepsini Sil",
                    'all_done_task_delete': "Tamamlanan taskları sil",
                    'logout':"ÇIKIŞ YAP",
                    'welcome':"Hoşgeldin :"



                }
            }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: { escapeValue: false, formatSeparator: ',' },
    react: {
        wait: true
    }
});

export default i18n;
