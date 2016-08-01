'use strict';

import mongoose from 'mongoose';



var StatusSchema = new mongoose.Schema({
  name: String,
  key: String,
});

export default mongoose.model('Status', StatusSchema);

export const PROJECT_STATUS = {
    'evaluated':                    'project_evaluated',
    'accepted':                     'project_accepted',
    'pending':                      'project_pending',
    'rejected':                     'project_rejected',
    'accepting_funds':              'project_accepting_funds',
    'accepting_mentors':            'project_accepting_mentors',
    'in need of attorney':          'project_in_need_of_attorney',
    'in need of service providers': 'project_in_need_of_service_providers',
    'patent eligible':              'project_patent_eligible',
    'copyright eligible':           'project_copyright_eligible',
    'trademark eligible':           'project_trademark_eligible',
    'qualifies for trade secret':   'project_qualifies_for_trade_secret',
    'prebuild':                     'prebuild',
    'active':                       'active',
    'archived':                     'archived'
}
