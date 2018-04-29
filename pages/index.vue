<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-tabs tab-position="bottom">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-upload"></i>Upload</span>
                <el-upload
                  accept=" .jpg, .jpeg, .png"
                  class="avatar-uploader"
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleImageUploadChange"
                  :before-upload="beforeImageUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">jpg/png images with
                    size of less than 2MB</div>
                </el-upload>
                <el-button style="margin-left: 10px;" size="small"
                  type="success" @click="handleUpload" v-if="imageUrl">upload to GCPD</el-button>
            </el-tab-pane>
            <el-tab-pane label="Results">
              <span slot="label"><i class="el-icon-tickets"></i>Results</span>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="Closest Match">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                          <el-card :body-style="{ padding: '0px'}">
                          <img :src="scope.row.location" class="image">
                          <div style="padding: 14px;">
                            <el-progress :text-inside="true" :stroke-width="18"
                              :percentage="scope.row.percent_match" status="success"></el-progress>
                            <div class="bottom clearfix">
                            </div>
                          </div>
                        </el-card>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  label="% Match">
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="Actions">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleSendReport(scope.$index, scope.row)">Report</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          closest_match: 'Agitator Aligator',
          percent_match: 53,
          location:
          'https://headlight.s3.amazonaws.com/gGQhTbt_O9wD2lFxRdbzPw/elKtOo6L4EXKkkp2NmVXVw'
        }],
        imageUrl: ''
      }
    },
    methods: {
      async handleUpload() {
        const data = new FormData()
        const url = process.env.headLightApi
        const apiKey = process.env.headLightApiKey
        const image = this.$refs.upload._data.uploadFiles[0].raw

        data.append("api_key", apiKey)
        data.append("image", image)

        const config = { headers: { 'Content-Type': `multipart/form-data` } }

        try {
          const response = await this.$axios.post(url, data, config)
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      },
      handleSendReport(index, row) {
      },
      handleImageUploadChange(file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeImageUpload(file) {
        const isRightFormat = file.type === 'image/jpeg' || file.type ===
          'image/png'
        const isRightSize = file.size / 1024 / 1024 < 2

        if (!isRightFormat) {
          this.$message.error('Image must be PNG or JPG format')
        }
        if (!isRightSize) {
          this.$message.error('Image size cannot exceed 2MB')
        }
        return isRightSize && isRightFormat
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
