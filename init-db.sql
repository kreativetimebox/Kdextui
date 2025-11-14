-- Initialize FinanceAI Database Schema
-- Updated: November 13, 2025
-- Tables: UserMaster, ApiEndpointMaster, UserApiLog

-- ============================================
-- TABLE 1: UserMaster
-- ============================================
CREATE TABLE IF NOT EXISTS UserMaster (
  UserID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  api_key VARCHAR(255) UNIQUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for UserMaster
CREATE INDEX IF NOT EXISTS idx_usermaster_email ON UserMaster(email);
CREATE INDEX IF NOT EXISTS idx_usermaster_api_key ON UserMaster(api_key);
CREATE INDEX IF NOT EXISTS idx_usermaster_created_at ON UserMaster(created_at);

-- Add comments for UserMaster
COMMENT ON TABLE UserMaster IS 'Stores user account information for FinanceAI API';
COMMENT ON COLUMN UserMaster.UserID IS 'Unique identifier for each user (UUID)';
COMMENT ON COLUMN UserMaster.email IS 'Unique email address for user authentication';
COMMENT ON COLUMN UserMaster.first_name IS 'User first name';
COMMENT ON COLUMN UserMaster.last_name IS 'User last name';
COMMENT ON COLUMN UserMaster.password_hash IS 'Hashed password for security';
COMMENT ON COLUMN UserMaster.api_key IS 'Unique production API key for authentication (sk_live_...)';
COMMENT ON COLUMN UserMaster.last_login IS 'Timestamp of last successful login';
COMMENT ON COLUMN UserMaster.created_at IS 'Account creation timestamp';
COMMENT ON COLUMN UserMaster.updated_at IS 'Last update timestamp';

-- ============================================
-- TABLE 2: ApiEndpointMaster
-- ============================================
CREATE TABLE IF NOT EXISTS ApiEndpointMaster (
  ApiEndpointID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ApiVersion VARCHAR(50) NOT NULL,
  ApiEndpoint VARCHAR(500) NOT NULL,
  EndpointType VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for ApiEndpointMaster
CREATE INDEX IF NOT EXISTS idx_apiendpoint_version ON ApiEndpointMaster(ApiVersion);
CREATE INDEX IF NOT EXISTS idx_apiendpoint_endpoint ON ApiEndpointMaster(ApiEndpoint);
CREATE INDEX IF NOT EXISTS idx_apiendpoint_type ON ApiEndpointMaster(EndpointType);

-- Add comments for ApiEndpointMaster
COMMENT ON TABLE ApiEndpointMaster IS 'Stores all available API endpoints and versions';
COMMENT ON COLUMN ApiEndpointMaster.ApiEndpointID IS 'Unique identifier for each API endpoint';
COMMENT ON COLUMN ApiEndpointMaster.ApiVersion IS 'API version (e.g., v1, v2, beta)';
COMMENT ON COLUMN ApiEndpointMaster.ApiEndpoint IS 'The full API endpoint path (e.g., /api/v1/documents/scan)';
COMMENT ON COLUMN ApiEndpointMaster.EndpointType IS 'Type of endpoint (e.g., GET, POST, PUT, DELETE)';
COMMENT ON COLUMN ApiEndpointMaster.created_at IS 'Endpoint creation timestamp';
COMMENT ON COLUMN ApiEndpointMaster.updated_at IS 'Last update timestamp';

-- ============================================
-- TABLE 3: UserApiLog
-- ============================================
CREATE TABLE IF NOT EXISTS UserApiLog (
  UserApiLogID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  UserID UUID NOT NULL,
  ApiEndpointId UUID NOT NULL,
  EndpointAccessDateTime TIMESTAMP NOT NULL,
  IsRequestSucceeded BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign Key Constraints
  CONSTRAINT fk_userlog_userid FOREIGN KEY (UserID) REFERENCES UserMaster(UserID) ON DELETE CASCADE,
  CONSTRAINT fk_userlog_apiendpointid FOREIGN KEY (ApiEndpointId) REFERENCES ApiEndpointMaster(ApiEndpointID) ON DELETE CASCADE
);

-- Create indexes for UserApiLog
CREATE INDEX IF NOT EXISTS idx_userlog_userid ON UserApiLog(UserID);
CREATE INDEX IF NOT EXISTS idx_userlog_apiendpointid ON UserApiLog(ApiEndpointId);
CREATE INDEX IF NOT EXISTS idx_userlog_accessdatetime ON UserApiLog(EndpointAccessDateTime);
CREATE INDEX IF NOT EXISTS idx_userlog_issuccess ON UserApiLog(IsRequestSucceeded);
CREATE INDEX IF NOT EXISTS idx_userlog_created_at ON UserApiLog(created_at);

-- Add comments for UserApiLog
COMMENT ON TABLE UserApiLog IS 'Tracks all API endpoint access by users for auditing and monitoring';
COMMENT ON COLUMN UserApiLog.UserApiLogID IS 'Unique identifier for each API access log entry';
COMMENT ON COLUMN UserApiLog.UserID IS 'Reference to UserMaster (user who made the request)';
COMMENT ON COLUMN UserApiLog.ApiEndpointId IS 'Reference to ApiEndpointMaster (endpoint accessed)';
COMMENT ON COLUMN UserApiLog.EndpointAccessDateTime IS 'Timestamp when the endpoint was accessed';
COMMENT ON COLUMN UserApiLog.IsRequestSucceeded IS 'Boolean flag indicating if the request succeeded (true) or failed (false)';
COMMENT ON COLUMN UserApiLog.created_at IS 'Log entry creation timestamp';
COMMENT ON COLUMN UserApiLog.updated_at IS 'Last update timestamp';

-- ============================================
-- Helper Functions/Views (Optional)
-- ============================================

-- View: Get user activity summary
CREATE OR REPLACE VIEW UserActivitySummary AS
SELECT 
  um.UserID,
  um.email,
  um.first_name,
  um.last_name,
  COUNT(ual.UserApiLogID) as total_api_calls,
  SUM(CASE WHEN ual.IsRequestSucceeded = true THEN 1 ELSE 0 END) as successful_calls,
  SUM(CASE WHEN ual.IsRequestSucceeded = false THEN 1 ELSE 0 END) as failed_calls,
  MAX(ual.EndpointAccessDateTime) as last_api_access,
  um.last_login,
  um.created_at
FROM UserMaster um
LEFT JOIN UserApiLog ual ON um.UserID = ual.UserID
GROUP BY um.UserID, um.email, um.first_name, um.last_name, um.last_login, um.created_at;

COMMENT ON VIEW UserActivitySummary IS 'Summary view of user activity including API call statistics';

-- ============================================
-- Sample Data (Optional - Comment out if not needed)
-- ============================================

-- Insert sample users into UserMaster
INSERT INTO UserMaster (UserID, first_name, last_name, email, password_hash, last_login, created_at, updated_at, api_key)
VALUES
  ('e58a7b47-d303-4477-b343-4495c7e128aa', 'Thaddeus', 'O''Hare', 'tohare0@sina.com.cn', '$2a$04$PY5gZHrtoc873YlIskjPouCYRlrbLt1h5aO1rFKkuG3NQ0Cfo1ovW', '2025-09-19', '2025-08-20', '2025-02-23', '$2a$04$fS34EpZfApaKiVQNAwIQjenBS7.NjpfkOfRMJHCC1jM56fIJRVUKO'),
  ('cb8c9e43-8738-46e1-a359-201e2fc4a8cc', 'Lucas', 'Biggans', 'lbiggans1@liveinternet.ru', '$2a$04$HJTgjMpbSDFQKPXVvSGb2uUjGeo2F/cIqbZv4SehGhCMpJ9aDlk8e', '2024-12-08', '2025-10-23', '2025-10-31', '$2a$04$FVBnYgmIB9NdIFGIf43nKO3Nw5GVWqC7nFOOZZtYmSpS585hvBnmq'),
  ('85f2ca18-dd91-42f0-8d46-a7dd5b1e250a', 'Franciska', 'Athelstan', 'fathelstan2@census.gov', '$2a$04$8VrLWHW5SWnCw1Ok23a4a.m6iFV3jD00j4DF45.ljexklZVMwR9Mm', '2025-10-31', '2025-04-01', '2025-11-09', '$2a$04$QAc13SOZKG0zdL4Vbxv2lu7lP264ZG9fyzKV0nJi/l4FO8kZCA.hO'),
  ('a43204b5-8ed3-49fa-ae7b-6389589afa4e', 'Cayla', 'Gregon', 'cgregon3@pbs.org', '$2a$04$ztUAOr/ytznDaZ.gv8hSt.G2wG9krDr5FQ/sf2A3YMcY6KGuxGLtC', '2025-08-25', '2025-05-27', '2025-10-26', '$2a$04$nyiIWCOCtJfTKSm8Jl3GKu39Yxv94JF2fQL6wY.BGG7rV0tPVcZGm'),
  ('53322573-201c-4177-94fe-e1f24ad7d1ea', 'Claudia', 'Kuhnhardt', 'ckuhnhardt4@samsung.com', '$2a$04$13zJ2cZHv3Cy6xC8.bPoL.lJcqz36Ee07flBri0ilZU3nKmNFbekS', '2025-08-01', '2025-03-16', '2024-12-04', '$2a$04$dsPU8.Wr9ELjPQ/ATlZP9unQQprn95r3.SVz5TmbLFHGh8Oedl81K')
ON CONFLICT (email) DO NOTHING;

-- Insert sample API endpoints
INSERT INTO ApiEndpointMaster (ApiEndpointID, ApiVersion, ApiEndpoint, EndpointType, created_at, updated_at)
VALUES
  ('c3b5ba49-eefd-4cdd-82c6-8b0f59cddf2d', 'v1', 'process-bank-statement', 'restricted', '2025-08-24', '2025-09-21'),
  ('70f0470b-0ce6-4b5e-b470-0c949cd73a34', 'v1', 'process-bank-statement', 'development', '2025-01-04', '2025-10-08'),
  ('37c1954f-44c1-4959-927f-fdecfa5362f3', 'v1', 'upload-document', 'internal', '2025-07-07', '2025-11-09'),
  ('b8ed4545-cc74-4de4-b252-0b231f7fe638', 'v1', 'bulk-process-folder', 'test', '2025-11-06', '2025-01-16'),
  ('7b618c1e-3459-4551-9ee1-de3f3a79c10b', 'v1', 'process-bank-statement', 'guest', '2024-11-17', '2025-04-06'),
  ('d990c3f5-0f50-47eb-8ebf-0a025fe7437f', 'v1', 'process-bank-statement', 'internal', '2025-03-28', '2025-06-16'),
  ('2328bff0-e3e5-4dc5-b29d-83c66c562e98', 'v1', 'process-bank-statement', 'test', '2025-09-27', '2025-10-18'),
  ('0f992700-9ebd-49d2-b186-a67fd968f4e7', 'v1', 'bulk-process-folder', 'development', '2025-01-21', '2025-08-16'),
  ('228e8bd5-6922-4be8-b8dc-dfa88fda8054', 'v1', 'process-bank-statement', 'test', '2025-02-28', '2025-06-17'),
  ('47752bb1-1422-495b-82a7-2957edc0897d', 'v1', 'process-bank-statement', 'private', '2025-02-04', '2025-03-01'),
  ('ff41dce5-157a-40b5-9f6d-34a86799a6fb', 'v1', 'upload-document', 'external', '2025-10-10', '2025-08-30'),
  ('85390fb2-521e-4fb3-be2b-abd206a98a17', 'v1', 'bulk-process-folder', 'test', '2025-03-15', '2025-04-08'),
  ('9cabcc12-70e3-4fa7-9edd-b27184636901', 'v1', 'upload-document', 'external', '2025-07-19', '2025-03-29'),
  ('c7abe9e9-e760-4ef1-98fd-37f2d7f3590d', 'v1', 'upload-document', 'test', '2025-06-18', '2025-02-11'),
  ('76df269d-9891-4b67-8ecc-da3a0eab1d07', 'v1', 'bulk-process-folder', 'public', '2025-09-14', '2025-02-24'),
  ('0777e3fc-26ab-452b-9f94-fe46d7026705', 'v1', 'bulk-process-folder', 'private', '2025-07-13', '2025-08-18'),
  ('5f8a5c40-056e-4edb-a004-db65d68635b7', 'v1', 'upload-document', 'restricted', '2025-03-08', '2024-12-10'),
  ('87702535-f0f8-473a-87d5-d18419c94c95', 'v1', 'bulk-process-folder', 'guest', '2025-08-09', '2025-03-14'),
  ('d3f42b22-60c8-4a05-b303-40171da92944', 'v1', 'bulk-process-folder', 'private', '2025-06-25', '2025-02-28'),
  ('766082d8-0b7f-452b-a0cc-090ff89f4cec', 'v1', 'upload-document', 'restricted', '2025-06-10', '2025-07-08'),
  ('9a262b5e-2115-46fe-8cd7-aa789cbe6043', 'v1', 'upload-document', 'development', '2025-08-10', '2025-07-14'),
  ('6b5145cc-5e62-49dc-badd-5f61069a48b6', 'v1', 'bulk-process-folder', 'test', '2025-01-17', '2025-04-12'),
  ('e3282513-c4cc-4577-a174-3b756db5baab', 'v1', 'upload-document', 'internal', '2025-08-06', '2025-08-31'),
  ('b5778463-95d1-48cf-8bc2-b6f7b46fc11b', 'v1', 'bulk-process-folder', 'internal', '2025-04-05', '2025-09-30'),
  ('4d9d6d12-874a-4958-a3d5-a6376079fd31', 'v1', 'upload-document', 'internal', '2025-09-20', '2024-12-19'),
  ('57bdc6c1-3714-44ee-9aba-6b39fe470ac5', 'v1', 'upload-document', 'admin', '2025-07-27', '2025-04-16'),
  ('4033eaa6-37d7-4824-9cb4-2fbe7d944529', 'v1', 'process-bank-statement', 'internal', '2025-10-06', '2025-04-17'),
  ('7d6bf952-436a-4877-b135-3dde3977967d', 'v1', 'process-bank-statement', 'private', '2025-08-19', '2025-07-31'),
  ('503be717-86fb-43f7-aeed-2e443e42e834', 'v1', 'process-bank-statement', 'internal', '2024-11-14', '2025-03-08'),
  ('eda236c9-ad4c-48b9-8bb3-a0da9202a9e0', 'v1', 'upload-document', 'secure', '2025-07-31', '2025-09-22'),
  ('074c5bd0-24af-4138-a3de-da8c424b49c6', 'v1', 'upload-document', 'internal', '2025-11-11', '2025-06-15'),
  ('5cdee081-8eb3-408b-9e56-179865b2d5a2', 'v1', 'process-bank-statement', 'guest', '2025-04-19', '2025-07-09'),
  ('8d346109-1ddc-4e3e-9b7e-efd0b54421b7', 'v1', 'process-bank-statement', 'restricted', '2025-07-27', '2025-08-31'),
  ('0ba2b468-930d-4978-81df-400fa62c98df', 'v1', 'bulk-process-folder', 'public', '2025-03-13', '2025-07-17'),
  ('61991275-6975-4e3d-9c92-5d3f12b28411', 'v1', 'bulk-process-folder', 'public', '2025-08-07', '2025-04-26'),
  ('781299e5-37d3-4ef1-96bd-632aef204f16', 'v1', 'bulk-process-folder', 'secure', '2025-04-27', '2025-05-03'),
  ('7bb5a4da-18e8-4017-9df7-5eb83bbfa897', 'v1', 'process-bank-statement', 'guest', '2025-06-23', '2025-08-28'),
  ('66785d82-d519-49df-b184-763a9d607b17', 'v1', 'process-bank-statement', 'public', '2025-03-25', '2025-04-06'),
  ('ece4f427-da13-44e7-948f-8a500d3f6e66', 'v1', 'upload-document', 'internal', '2025-04-04', '2025-06-06'),
  ('c3cf5455-1fd9-455d-b431-df8edce92067', 'v1', 'process-bank-statement', 'admin', '2025-01-02', '2025-10-15'),
  ('27de1f26-14a8-4b98-8e4e-fefaca64450b', 'v1', 'process-bank-statement', 'guest', '2025-01-05', '2025-02-15'),
  ('8f7b9fbd-cedf-44af-85fc-ca4e535a15c8', 'v1', 'bulk-process-folder', 'private', '2024-11-30', '2025-02-22'),
  ('61406aa2-a90c-4362-b65b-178467d0a84c', 'v1', 'bulk-process-folder', 'internal', '2025-01-28', '2025-08-18'),
  ('7addbb09-6368-439d-8b0f-2c83e78d423f', 'v1', 'bulk-process-folder', 'public', '2024-11-27', '2025-07-22'),
  ('a598b0a2-b8a8-4a3e-bb4f-9d11503c8a79', 'v1', 'bulk-process-folder', 'private', '2025-07-06', '2024-12-18'),
  ('9b386898-a842-4c34-ae7d-094db115c4e3', 'v1', 'process-bank-statement', 'development', '2025-07-26', '2025-02-08'),
  ('72c73295-6ab2-4a62-be81-7a84050ce323', 'v1', 'bulk-process-folder', 'secure', '2025-10-21', '2025-08-01'),
  ('deca2927-82be-47e4-99bd-17cd8bdc76c2', 'v1', 'upload-document', 'admin', '2025-02-13', '2024-12-23'),
  ('8994de65-bf98-4b2d-a778-31b5d88d6607', 'v1', 'bulk-process-folder', 'private', '2025-09-23', '2024-12-28'),
  ('db4ecf75-4bb3-440b-b47c-9411f788d93e', 'v1', 'process-bank-statement', 'test', '2024-11-30', '2025-01-12')
ON CONFLICT (ApiEndpointID) DO NOTHING;
