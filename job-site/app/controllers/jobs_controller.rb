class JobsController < ApplicationController
	require 'open-uri'
	require 'json'

	def index
		# Search form. 
	end

	def search
		@jobs = JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/search?#{parameterize}").read)
		# JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/search?#{parameterize}").read)
	end

	def show
		@job = JSON.parse(open("http://yagajobs.co.uk/api/vacancies.json/#{params[:id]}?api_key=9ef095b57dc3e3eb7449bfcffbc01b54").read)
	end

	private 
	def parameterize 
		params.delete("utf8")
		params.delete("commit")
		params["api_key"] = "9ef095b57dc3e3eb7449bfcffbc01b54"
		params.collect { |k,v| "#{k}=#{CGI::escape(v.to_s)}" }.join('&')
	end
end
